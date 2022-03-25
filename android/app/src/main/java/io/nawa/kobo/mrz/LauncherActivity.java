package io.nawa.kobo.mrz;

import android.content.Intent;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.JSObject;

@CapacitorPlugin(name = "LauncherActivity")
public class LauncherActivity extends Plugin {

    @PluginMethod()
    public void sendMRT(PluginCall call) {

        JSObject result = new JSObject();
        result.put("response", "Scanned data has been sent to KoBo");

        System.out.println("Testing Result: " + call.getString("some_text1") + " - " + call.getString("some_text2"));

        Intent i = new Intent();
        i.putExtra("some_text1", call.getString("some_text1"));
        i.putExtra("some_text2", call.getString("some_text2"));

        //setResult(RESULT_OK, i);
        //finish();

        call.resolve(result);
    }
}
