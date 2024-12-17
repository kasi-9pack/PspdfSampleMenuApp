// Document names
import { Platform } from 'react-native';
import fileSystem from 'react-native-fs';


export const exampleImage = 'PSPDFKit_Image_Example.jpg';
export const exampleImagePath = 'file:///android_asset/' + exampleImage;


export const pspdfkitColor = '#267AD4';

// Document paths
const tiffImageName = 'PSPDFKit_Image_Example.tiff';
export const tiffImagePath = 'file:///android_asset/' + tiffImageName;

const measurementsName = 'Measurements.pdf';
export const measurementsDocument = 'file:///android_asset/' + measurementsName;

export const formDocumentName = 'Gardiner_Sample_FormFill.pdf'; // ;'Form_example.pdf';
export const formDocumentPath = 'file:///android_asset/' + formDocumentName;


export const exampleDocumentName = 'Gardiner_Sample01.pdf'; //'sample.pdf'; //'PSPDFKit_Quickstart_Guide.pdf';
export const exampleDocumentPath = 'file:///android_asset/' + exampleDocumentName;
export const writableDocumentPath = 'file://' + fileSystem.DocumentDirectoryPath + '/' + exampleDocumentName;

export const formTypeDocumentName = 'client_form_02.pdf'; //'Invoice_ServiceTitan.pdf'; //'sample.pdf'; //'PSPDFKit_Quickstart_Guide.pdf';
export const writableformTypeDocumentPath = 'file://' + fileSystem.DocumentDirectoryPath + '/' + formTypeDocumentName;

export const writableFormDocumentPath =
  Platform.OS === 'ios'
    ? fileSystem.DocumentDirectoryPath + '/' + formDocumentName
    : 'file://' + fileSystem.DocumentDirectoryPath + '/' + formDocumentName;

export const sampleDoc01 = 'file:///android_asset/client_form_01.pdf';
export const sampleDoc02 = 'file:///android_asset/client_form_02.pdf';
export const writable9PackSampleDoc = fileSystem.DocumentDirectoryPath + '/9pack_sample_form_updated.pdf';
