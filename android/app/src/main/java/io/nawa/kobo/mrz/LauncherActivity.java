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
    ((MainActivity)getActivity()).sendData(call.getString("Tazkira_no_001"), call.getString("name"), call.getString("father_name"), call.getInt("hhh_age"), call.getString("hhh_gender"));
    call.resolve(result);
  }
}
