import React from 'react';
import fileSystem from 'react-native-fs';
import { Alert, Button, NativeModules, View, processColor } from 'react-native';

import { BaseExampleAutoHidingHeaderComponent } from '../Global/BaseExampleAutoHidingHeaderComponent';
import { Droid_license, pspdfkitColor, sampleDoc01, sampleDoc02, writable9PackSampleDocPath, } from '../main/Global/Constants';
import PSPDFKitView, { DocumentPDFConfiguration } from 'react-native-pspdfkit';

export default class DynamicLoadFillSavePdfScreen extends BaseExampleAutoHidingHeaderComponent {
  pdfRef: React.RefObject<PSPDFKitView>;

  constructor(props: any) {
    super(props);
    const PSPDFKit = NativeModules.PSPDFKit;
    PSPDFKit.setLicenseKey(Droid_license);
    
    this.pdfRef = React.createRef();
    
    this.state = {
      documentPath: sampleDoc01,
    };
  }

  async componentDidMount() {
     // Check if file exists
     const fileExists = await fileSystem.exists(writable9PackSampleDocPath);
            
     if (fileExists) {
       console.log("File exists. Proceeding to delete.");
 
       // Delete the file
       await fileSystem.unlink(writable9PackSampleDocPath);
       console.log("File deleted successfully.");
     }

    console.log("componentDidMount called --------");
    await this.mergeDocs();
    console.log("componentDidMount completed --------");
    
  }

  async mergeDocs(){
    try {
        // const PSPDFKit = NativeModules.PSPDFKit;
        // PSPDFKit.setLicenseKey(Droid_license);

        const Processor = NativeModules.RNProcessor;
        
        let fileName = 'PDFFromDocuments';
        let outputFile = null;
        // For images from assets, you'll need to provide the global path for images in iOS.
        // In case you took image from the camera, you can use local path, instead.
        // Remote images from web URL will need to be downloaded first and then used as local path.
        // let globalPath = getMainBundlePath(exampleDocumentPath.toString());
        try {
            outputFile = fileSystem.DocumentDirectoryPath + '/mergedTemp.pdf';
        } catch (e: any) {
            console.log(e.message, e.code);
            Alert.alert('PSPDFKit', e.message);
        }

        const configuration: DocumentPDFConfiguration = {
            filePath: outputFile!,
            documents: [
            {
                documentPath:sampleDoc01,
                pageIndex: 0,
            },
            {
                documentPath:sampleDoc02,
                pageIndex: 0,
            },
            ],
            override: true,
        };

        try {

            const { fileURL } = await Processor.generatePDFFromDocuments(configuration);
            //await this.pdfRef.current?.getDocument().invalidateCache();
            this.setState({ documentPath: outputFile });
            //await this.pdfRef.current?.getDocument().invalidateCache();
            console.log("fileURL - Documents merged and saved at :", fileURL);
            console.log("outputFile - Documents merged and saved at :", outputFile);
            // Do something with the new file by accessing it from the `fileURL` path.
        } catch (error) {
          console.error(error);
        }

    } catch (error) {
        console.error("Error fetching or setting annotations:", error);
    }
  }

  async fillForm(): Promise<boolean> {
    try {
        
      // this.setState({ alertVisible: false });
      // extractFromAssetsIfMissing(writable9PackSampleFinalDocName, () => {
      //   this.setState({ documentPath: writable9PackSampleFinalDocPath });
      // });
      
      console.log('Entered fillForm ----------');

      const annotations = await this.pdfRef.current?.getDocument().getAnnotations(); //getAnnotationsForPage(0);
      
      console.log('annotations : ', this.pdfRef.current?.getDocument().getDocumentId, annotations);

      if (annotations && Array.isArray(annotations)){
        // Loop through annotations

        var annotationPromises: any[] = [];
        annotations.forEach(annotation => {
          console.log('annotation loop : ', annotation.formFieldName, annotation.type === "pspdfkit/widget");
          // Check if the annotation type is "pspdfkit/widget"
          if (annotation.type === "pspdfkit/widget") {
              // Set a new value based on the type (e.g., updating the text of the form field)
              const newValue = "Updated Value"; // Set the value you want here

              // Update the annotation with the new value
              annotationPromises.push(this.pdfRef.current?.setFormFieldValue(annotation.formFieldName, newValue));
          }
        });
        await Promise.all(annotationPromises);
        return Promise.resolve(true);
      } else {
        console.log('Invalid annotations or Null');
        return Promise.resolve(false);
      }
    } catch (error) {
      console.error("Error fetching or setting annotations:", error);
      return Promise.resolve(false);
    }
    
    console.log('Completed fillForm ----------');
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
              onPress={async () => {
                try {
                  // Fill Form
                  await this.fillForm();
                  
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
                } catch (error) {
                  console.error(error);
                }
              }}
              title="Fill Form And Save"
              accessibilityLabel="FormFill Pdfs"
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