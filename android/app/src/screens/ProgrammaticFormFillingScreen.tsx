import React from 'react';
import { Alert, Button, NativeModules, processColor, View } from 'react-native';
import PSPDFKitView, { PDFConfiguration } from 'react-native-pspdfkit';

import {
  Droid_license,
  formDocumentName,
  formDocumentPath,
  pspdfkitColor,
  writableFormDocumentPath,
} from '../main/Global/Constants';
import { BaseExampleAutoHidingHeaderComponent } from '../Global/BaseExampleAutoHidingHeaderComponent';
import { extractFromAssetsIfMissing } from '../main/Global/FileSystemHelpers';

export default class ProgrammaticFormFillingScreen extends BaseExampleAutoHidingHeaderComponent {
  pdfRef: React.RefObject<PSPDFKitView>;

  constructor(props: any) {
    super(props);
    
    console.log('Form Filling Document Directory Path:', writableFormDocumentPath);

    const PSPDFKit = NativeModules.PSPDFKit;
    PSPDFKit.setLicenseKey(Droid_license); //('YmaGOsVsIbDLCNlPypviQmAYakLHoq9O-jOFhnhEtOdkdTS3gME6tId9TGuEsX5kG1YBiFpSZaJQHNd6pFT7QDPNSP2ovSeJWjpFluyVp3nj6nflpgtvDyju83iTeGzixJkl_LW2kg1wTYiY4Z4Df_BHYoO9Gt_Y2cKSKOO9HEc--Ik2Be1Al1htZtj261mBDeToxq_JV3cAjnAbbt1usbN-FjVAd2tFZcLlVMpiZiJf0AhLfltI0eLsN1EqrfEF0bDmIAFGTjtXJs9L6Su5m0bcx51QQP4g8bl5VitdClmu3Cv-NSrOuhKxlYktqPW1FhnpvKSHmxWjNthac0t46uQbGNo0kyEReHqGrtBz0vaks35PApGvDKRzsO2u1JXkEIzNYQWmsWhap9dsUTJ-4NJojuJue765gSB2gVdZ6Fzq2GyybOwAQwtosMkfYgV--2kCsqkNmCyFNGtOPltCiZGrjsf7VTbPBZmJlJtk_vjbr7W9X3bNr2ZksdqWvuteJy0lH72QKYVqrAiJZFUTOv2xZ4qJ6WxAl1XwcEljjVIKazjTbVYLmc-Y_7wejuhZpUdzFqUKhSlnu37ICa7Kxy0B_vLZYQXNA3hVLBJNsF4MsYQO16WWIJ_uTe5Zt97TpTY6Lo-vRs5EEdff-VeP72yOftikPBjifAJci3rqsp8apRPiVGbCl88xpB818DdnHtg7GG9e_pPeDcHJLP2S-kRfz_wK5kA6kdrbmPp0E-I='); // Or your valid license keys using `setLicenseKeys`.
    this.pdfRef = React.createRef();
    
    this.state = {
      documentPath: formDocumentPath,
    };
  }

  override componentDidMount() {
    this.setState({ alertVisible: false });
    extractFromAssetsIfMissing(formDocumentName, () => {
      this.setState({ documentPath: writableFormDocumentPath });
    });
  }

  override render() {
    return (
      <View style={styles.flex}>
        <PSPDFKitView
          ref={this.pdfRef}
          document={this.state.documentPath}
          configuration={{
            iOSBackgroundColor: processColor('lightgray'),
            documentLabelEnabled: true,
            firstPageAlwaysSingle: false,
            disableAutomaticSaving: true,
            signatureSavingStrategy: 'saveIfSelected',
          }}
          onAnnotationsChanged={(event: { error: any }) => {
            if (event.error) {
              Alert.alert('PSPDFKit', event.error);
            } else {
              if (this.state.alertVisible === false) {
                Alert.alert(
                  'PSPDFKit',
                  'Annotations changed: ' + JSON.stringify(event),
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        this.setState({ alertVisible: false });
                      },
                    },
                  ],
                );
                this.setState({ alertVisible: true });
              }
            }
          }}
          style={styles.pdfColor}
        />
        <View style={styles.wrapperView}>
          <View style={styles.marginLeft}>
            <Button
              onPress={() => {
                // Fill Text Form Fields.
                this.pdfRef.current
                  ?.setFormFieldValue('Wono.0', '2024')
                  .then(result => {
                    if (result) {
                      console.log('Wono : Successfully set the form field value.');
                      this.pdfRef.current
                        ?.setFormFieldValue('Calltype.0', 'Refrigrator')
                        .then(result => {
                          if (result) {
                            console.log('Calltype : Successfully set the form field value.');
                            
                            this.pdfRef.current
                            ?.setFormFieldValue('Caller', 'Technician')
                            .then(result => {
                              if (result) {
                                console.log('Successfully set the form field value.');

                                this.pdfRef.current
                                ?.setFormFieldValue('Wodate', '21-10-2024')
                                .then(result => {
                                  if (result) {
                                    console.log('Successfully set the form field value.');

                                    this.pdfRef.current
                                    ?.setFormFieldValue('Workorder', '2024')
                                    .then(result => {
                                      if (result) {
                                        console.log('Successfully set the form field value.');

                                        this.pdfRef.current
                                        ?.setFormFieldValue('Currentdate', '21-10-2024')
                                        .then(result => {
                                          if (result) {
                                            console.log('Successfully set the form field value.');

                                            this.pdfRef.current
                                            ?.setFormFieldValue('Address', 'Hyderabad')
                                            .then(result => {
                                              if (result) {
                                                console.log('Successfully set the form field value.');
                                              } else {
                                                Alert.alert(
                                                  'PSPDFKit',
                                                  'Failed to set form field value.',
                                                );
                                              }
                                            })
                                            .catch(error => {
                                              Alert.alert('PSPDFKit', JSON.stringify(error));
                                            });
                                          } else {
                                            Alert.alert(
                                              'PSPDFKit',
                                              'Failed to set form field value.',
                                            );
                                          }
                                        })
                                        .catch(error => {
                                          Alert.alert('PSPDFKit', JSON.stringify(error));
                                        });
                                      } else {
                                        Alert.alert(
                                          'PSPDFKit',
                                          'Failed to set form field value.',
                                        );
                                      }
                                    })
                                    .catch(error => {
                                      Alert.alert('PSPDFKit', JSON.stringify(error));
                                    });
                                  } else {
                                    Alert.alert(
                                      'PSPDFKit',
                                      'Failed to set form field value.',
                                    );
                                  }
                                })
                                .catch(error => {
                                  Alert.alert('PSPDFKit', JSON.stringify(error));
                                });
                              } else {
                                Alert.alert(
                                  'PSPDFKit',
                                  'Failed to set form field value.',
                                );
                              }
                            })
                            .catch(error => {
                              Alert.alert('PSPDFKit', JSON.stringify(error));
                            });
                          } else {
                            Alert.alert(
                              'PSPDFKit',
                              'Failed to set form field value.',
                            );
                          }
                        })
                        .catch(error => {
                          Alert.alert('PSPDFKit', JSON.stringify(error));
                        });
                    } else {
                      Alert.alert(
                        'PSPDFKit',
                        'Failed to set form field value.',
                      );
                    }
                  })
                  .catch(error => {
                    Alert.alert('PSPDFKit', JSON.stringify(error));
                  });
              }}
              title="Fill Form"
              accessibilityLabel="Fill Form"
            />
          </View>
          <View style={styles.marginLeft}>
            <Button
              onPress={async () => {
                // Get the First Name Value.
                const firstNameValue =
                  await this.pdfRef.current?.getFormFieldValue('Address');
                Alert.alert('PSPDFKit', JSON.stringify(firstNameValue));
              }}
              title="Get Last Name Value"
              accessibilityLabel="Get Last Name Value"
            />
          </View>
        </View>
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