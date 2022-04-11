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

  public void sendData(String Tazkira_no_001, String name, String father_name, int hhh_age, String hhh_gender) {
    Intent i = new Intent(this, MainActivity.class);

    i.putExtra("Tazkira_no_001", Tazkira_no_001);
    i.putExtra("name", name);
    i.putExtra("father_name", father_name);
    i.putExtra("hhh_age", hhh_age);
    i.putExtra("hhh_gender", hhh_gender);
        //startActivity(i);
    setResult(RESULT_OK, i);
    finish();
  }
}
