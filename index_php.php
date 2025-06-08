<?php
error_reporting(E_ALL & ~E_DEPRECATED);

require_once('vendor/autoload.php');

// APIキー渡す
$client = new \Microcms\Client(
  "test-restaurant",  // YOUR_DOMAIN is the XXXX part of https://XXXX.microcms.io
  "BgN8GTQoC3uCwhOYDpAxnBjv7CFW8HbGxrxv"  // API Key
);

// プレビュー画面用 draftKey取得
$draftKey = $_GET['draftKey'] ?? null;

if ($draftKey) {
  // プレビュー用データを取得
  $data = $client->get('banner', [
    'queries' => ['draftKey' => $draftKey]
  ]);
  // 確認用に中身を表示
  echo '<pre>';
  print_r($data);
  echo '</pre>';
} else {
   $data = $client->get('banner');
  // 確認用に中身を表示
  echo '<pre>';
  print_r($data);
  echo '</pre>';
}