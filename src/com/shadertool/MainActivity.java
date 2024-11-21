package com.shadertool;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true); // Enable JavaScript if your HTML file contains scripts
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/vec3.html"); // Load the HTML file from the assets folder
    }
}
