import React from 'react';
import { Alert, Button, NativeModules, processColor, View } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';
import { pspdfkitColor, writableformTypeDocumentPath } from '../main/Global/Constants';
import { BaseExampleAutoHidingHeaderComponent } from '../Global/BaseExampleAutoHidingHeaderComponent';
import { Droid_license } from '../main/Global/Constants';

export default class PdfManualSaveScreen extends BaseExampleAutoHidingHeaderComponent {
    pdfRef: React.RefObject<PSPDFKitView>;

    constructor(props: any) {
      super(props);

      console.log('Document Directory Path:', writableformTypeDocumentPath); //writableDocumentPath);

      const PSPDFKit = NativeModules.PSPDFKit;
      PSPDFKit.setLicenseKey(Droid_license); //('YmaGOsVsIbDLCNlPypviQmAYakLHoq9O-jOFhnhEtOdkdTS3gME6tId9TGuEsX5kG1YBiFpSZaJQHNd6pFT7QDPNSP2ovSeJWjpFluyVp3nj6nflpgtvDyju83iTeGzixJkl_LW2kg1wTYiY4Z4Df_BHYoO9Gt_Y2cKSKOO9HEc--Ik2Be1Al1htZtj261mBDeToxq_JV3cAjnAbbt1usbN-FjVAd2tFZcLlVMpiZiJf0AhLfltI0eLsN1EqrfEF0bDmIAFGTjtXJs9L6Su5m0bcx51QQP4g8bl5VitdClmu3Cv-NSrOuhKxlYktqPW1FhnpvKSHmxWjNthac0t46uQbGNo0kyEReHqGrtBz0vaks35PApGvDKRzsO2u1JXkEIzNYQWmsWhap9dsUTJ-4NJojuJue765gSB2gVdZ6Fzq2GyybOwAQwtosMkfYgV--2kCsqkNmCyFNGtOPltCiZGrjsf7VTbPBZmJlJtk_vjbr7W9X3bNr2ZksdqWvuteJy0lH72QKYVqrAiJZFUTOv2xZ4qJ6WxAl1XwcEljjVIKazjTbVYLmc-Y_7wejuhZpUdzFqUKhSlnu37ICa7Kxy0B_vLZYQXNA3hVLBJNsF4MsYQO16WWIJ_uTe5Zt97TpTY6Lo-vRs5EEdff-VeP72yOftikPBjifAJci3rqsp8apRPiVGbCl88xpB818DdnHtg7GG9e_pPeDcHJLP2S-kRfz_wK5kA6kdrbmPp0E-I='); // Or your valid license keys using `setLicenseKeys`.
      this.pdfRef = React.createRef();
    }

    override render() {
      return (
        <View style={styles.flex}>
          <PSPDFKitView
            ref={this.pdfRef}
            document={writableformTypeDocumentPath} //writableDocumentPath}
            disableAutomaticSaving={true}
            configuration={{
              iOSBackgroundColor: processColor('lightgrey'),
            }}
            menuItemGrouping={[
              'pen',
              'freetext',
              { key: 'markup', items: ['highlight', 'underline'] },
              'image',
            ]}
            pageIndex={3}
            style={styles.pdfColor}
          />
          <View style={styles.wrapper}>
            <View style={styles.flex}>
              <Button
                accessibilityLabel={'Save Button'}
                testID={'Save Button'}
                onPress={async () => {

                  console.log('Document Annotations:', writableformTypeDocumentPath);

                  const annotations = await this.pdfRef.current?.getDocument().getAnnotationsForPage(0);
                  //const firstFormFieldName = annotations[0]['formFieldName'];
                  
                  console.log('Document Annotations:', annotations);

                  // Manual Save
                  this.pdfRef?.current?.getDocument().save()
                    .then(saved => {
                      if (saved) {
                        Alert.alert(
                          'PSPDFKit',
                          'Successfully saved current document.',
                        );
                      } else {
                        Alert.alert(
                          'PSPDFKit',
                          'Document was not saved as it was not modified.',
                        );
                      }
                    })
                    .catch(error => {
                      Alert.alert('PSPDFKit', JSON.stringify(error));
                    });
                }}
                title="Save"
              />
            </View>
          </View>
        </View>
      );
    }
  }
  
  const styles = {
    flex: { flex: 1 },
    pdfColor: { flex: 1, color: pspdfkitColor },
    wrapper: {
      flexDirection: 'row' as 'row',
      alignItems: 'center' as 'center',
      padding: 10,
    },
  };