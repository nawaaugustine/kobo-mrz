package io.nawa.kobo.mrz;

import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "LauncherActivity")
public class LauncherActivity extends Plugin {

  @PluginMethod
  public void sendMRT(PluginCall call) {
    JSObject result = new JSObject();
    result.put("response", "Scanned data has been sent to KoBo");
    call.resolve(result);
    ((MainActivity)getActivity()).sendData(call.getString("some_text1"), call.getString("some_text2"));
    
  }
}
