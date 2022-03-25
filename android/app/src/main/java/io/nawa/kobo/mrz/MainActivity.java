package io.nawa.kobo.mrz;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import io.nawa.kobo.mrz.LauncherActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(LauncherActivity.class);
    }
}
