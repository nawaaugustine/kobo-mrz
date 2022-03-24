package io.nawa.kobo.mrz;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent i = new Intent(this, MainActivity.class);
        i.replaceExtras(this.getIntent());
        startActivity(i);
        finish();
    }
}