package io.nawa.kobo.mrz;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import io.nawa.kobo.mrz.LauncherActivity;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(LauncherActivity.class);
  }

  public void sendData(String var1, String var2) {
    Intent i = new Intent(this, MainActivity.class);
    i.putExtra("some_text1", var1);
    i.putExtra("some_text2", var2);
    //startActivity(i);
    setResult(RESULT_OK, i);
    finish();
  }
}
