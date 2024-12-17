import React from 'react';
import fileSystem from 'react-native-fs';
import { Button, NativeModules, View } from 'react-native';
import { Annotation } from 'react-native-pspdfkit';

import { BaseExampleAutoHidingHeaderComponent } from '../Global/BaseExampleAutoHidingHeaderComponent';
import { Droid_license, pspdfkitColor, writableFlatternPdfDocumentPath } from '../main/Global/Constants';

export default class FlatternPdfScreen extends BaseExampleAutoHidingHeaderComponent {
  constructor(props: any) {
    super(props);
  }

  override render() {
    return (
      <View style={styles.flex}>
        <Button
          onPress={async () => {

            try {
                const sourceDocumentPath = 'file:///android_asset/Gardiner_UnFlatten_Sample.pdf';
                // Check if file exists
                const fileExists = await fileSystem.exists(writableFlatternPdfDocumentPath);
            
                if (fileExists) {
                  console.log("File exists. Proceeding to delete.");
            
                  // Delete the file
                  await fileSystem.unlink(writableFlatternPdfDocumentPath);
                  console.log("File deleted successfully.");
                }
                
                console.log("Source Path : ", sourceDocumentPath);
                console.log("Destination Path : ", writableFlatternPdfDocumentPath);

                const PSPDFKit = NativeModules.PSPDFKit;
                PSPDFKit.setLicenseKey(Droid_license); //('YmaGOsVsIbDLCNlPypviQmAYakLHoq9O-jOFhnhEtOdkdTS3gME6tId9TGuEsX5kG1YBiFpSZaJQHNd6pFT7QDPNSP2ovSeJWjpFluyVp3nj6nflpgtvDyju83iTeGzixJkl_LW2kg1wTYiY4Z4Df_BHYoO9Gt_Y2cKSKOO9HEc--Ik2Be1Al1htZtj261mBDeToxq_JV3cAjnAbbt1usbN-FjVAd2tFZcLlVMpiZiJf0AhLfltI0eLsN1EqrfEF0bDmIAFGTjtXJs9L6Su5m0bcx51QQP4g8bl5VitdClmu3Cv-NSrOuhKxlYktqPW1FhnpvKSHmxWjNthac0t46uQbGNo0kyEReHqGrtBz0vaks35PApGvDKRzsO2u1JXkEIzNYQWmsWhap9dsUTJ-4NJojuJue765gSB2gVdZ6Fzq2GyybOwAQwtosMkfYgV--2kCsqkNmCyFNGtOPltCiZGrjsf7VTbPBZmJlJtk_vjbr7W9X3bNr2ZksdqWvuteJy0lH72QKYVqrAiJZFUTOv2xZ4qJ6WxAl1XwcEljjVIKazjTbVYLmc-Y_7wejuhZpUdzFqUKhSlnu37ICa7Kxy0B_vLZYQXNA3hVLBJNsF4MsYQO16WWIJ_uTe5Zt97TpTY6Lo-vRs5EEdff-VeP72yOftikPBjifAJci3rqsp8apRPiVGbCl88xpB818DdnHtg7GG9e_pPeDcHJLP2S-kRfz_wK5kA6kdrbmPp0E-I='); // Or your valid license keys using `setLicenseKeys`.
                // const pdfRef = React.createRef();
                PSPDFKit.processAnnotations(Annotation.Change.FLATTEN,
                  [Annotation.Type.ALL], sourceDocumentPath, writableFlatternPdfDocumentPath, null).then(success => { 
                    if (success) { 
                      console.log("Pdf Flatterned Successfully"); 
                    } else { 
                      console.log("Could not Flatten Pdf"); 
                    } 
                  }) 
                  .catch(error => { 
                    console.log(JSON.stringify(error)); 
                  });
              } catch (error) {
                console.error("Error checking or deleting file:", error);
              }
          }}
          title="Flattern Pdfs"
          accessibilityLabel="Flattern Pdfs"
        />
      </View>
    );
  }
}

const styles = {
  flex: { flex: 1 },
  marginLeft: { marginLeft: 10 },
  wrapperView: {
    flexDirection: 'row' as 'row',
    height: 60,
    alignItems: 'center' as 'center',
    padding: 10,
  },
  pdfColor: { flex: 1, color: pspdfkitColor },
};