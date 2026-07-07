#!/usr/bin/perl
use strict;
use warnings;
use utf8;
use FindBin qw($Bin);
use Cwd qw(abs_path);
use File::Path qw(make_path);
use File::Basename qw(basename);
use CGI;

binmode STDOUT, ":encoding(UTF-8)";

# ▼ サーバーにアップ後、この値を実際のパスワードに書き換えてください
my $ADMIN_KEY = 'CHANGE_THIS_KEY';
my $ROOT = abs_path("$Bin/..");
my $DATA_FILE = "$ROOT/data/cars.json";
my $CAR_ASSET_DIR = "$ROOT/assets/cars";
my $MAX_BYTES = 6 * 1024 * 1024;

sub respond {
  my ($status, $type, $body) = @_;
  print "Status: $status\r\n";
  print "Content-Type: $type; charset=UTF-8\r\n\r\n";
  print $body;
  exit;
}

sub escape_json {
  my ($s) = @_;
  $s =~ s/\\/\\\\/g;
  $s =~ s/"/\\"/g;
  $s =~ s/\r/\\r/g;
  $s =~ s/\n/\\n/g;
  return $s;
}

sub require_auth {
  my $key = $ENV{'HTTP_X_KOTOKOTO_ADMIN_KEY'} || '';
  respond(403, 'text/plain', '管理キーが違います。') unless $key eq $ADMIN_KEY;
}

sub clean_id {
  my ($id) = @_;
  $id ||= '';
  $id =~ s/[^A-Za-z0-9_-]//g;
  return $id;
}

sub save_json {
  require_auth();
  my $len = $ENV{'CONTENT_LENGTH'} || 0;
  respond(413, 'text/plain', 'データが大きすぎます。') if $len > 1024 * 1024;
  read(STDIN, my $payload, $len);
  $payload =~ s/^\x{FEFF}//;
  respond(400, 'text/plain', 'JSON配列だけ保存できます。') unless $payload =~ /^\s*\[/ && $payload =~ /\]\s*$/;

  open my $fh, '>:encoding(UTF-8)', $DATA_FILE or respond(500, 'text/plain', 'cars.jsonを書き込めません。');
  print $fh $payload;
  close $fh;
  respond(200, 'text/plain', 'saved');
}

sub upload_files {
  require_auth();
  my $cgi = CGI->new;
  my $car_id = clean_id($cgi->param('carId'));
  respond(400, 'application/json', '{"error":"車両IDが必要です。"}') unless $car_id;

  my @uploads = $cgi->param('photos');
  respond(400, 'application/json', '{"error":"写真ファイルがありません。"}') unless @uploads;

  my $dir = "$CAR_ASSET_DIR/$car_id";
  make_path($dir) unless -d $dir;
  my @paths;

  for my $upload (@uploads) {
    my $fh = $cgi->upload($upload);
    next unless $fh;
    my $original = basename($upload || 'photo');
    my ($ext) = $original =~ /\.(jpe?g|png|webp)$/i;
    respond(400, 'application/json', '{"error":"jpg/png/webp のみアップロードできます。"}') unless $ext;
    $ext = lc($ext);
    $ext = 'jpg' if $ext eq 'jpeg';

    my $name = time . '-' . int(rand(100000)) . ".$ext";
    my $out_path = "$dir/$name";
    my $bytes = 0;
    open my $out, '>:raw', $out_path or respond(500, 'application/json', '{"error":"写真を保存できません。"}');
    while (read($fh, my $buffer, 8192)) {
      $bytes += length($buffer);
      if ($bytes > $MAX_BYTES) {
        close $out;
        unlink $out_path;
        respond(413, 'application/json', '{"error":"写真は1枚6MBまでです。"}');
      }
      print $out $buffer;
    }
    close $out;
    push @paths, "assets/cars/$car_id/$name";
  }

  my $json = '{"paths":[' . join(',', map { '"' . escape_json($_) . '"' } @paths) . ']}';
  respond(200, 'application/json', $json);
}

my $action = $ENV{'QUERY_STRING'} || '';
if ($action =~ /(?:^|&)action=save(?:&|$)/) {
  save_json();
}
if ($action =~ /(?:^|&)action=upload(?:&|$)/) {
  upload_files();
}

respond(404, 'text/plain', 'not found');
