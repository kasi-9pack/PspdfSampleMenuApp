import React from 'react';
import {Button, View, Text, Platform, Alert, PermissionsAndroid, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();

    // Function to request permissions
    const requestPermissions = async () => {
      try {
        // Check if the device is running Android 10 or below
        if (Platform.Version < 30) {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);

          const readPermission = granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
          const writePermission = granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];

          if (
            readPermission === PermissionsAndroid.RESULTS.GRANTED &&
            writePermission === PermissionsAndroid.RESULTS.GRANTED
          ) {
            return true; // Permissions granted
          } else if (
            readPermission === PermissionsAndroid.RESULTS.DENIED ||
            writePermission === PermissionsAndroid.RESULTS.DENIED
          ) {
            Alert.alert(
              "Permissions Required",
              "This app needs storage permissions to function properly. Please grant them.",
              [
                { text: "Retry", onPress: () => requestPermissions() }, // Retry request
                { text: "Cancel", style: "cancel" }, // Cancel button
              ]
            );
            return false;
          } else if (
            readPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
            writePermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          ) {
            Alert.alert(
              "Permissions Required",
              "You've denied the permission permanently. Please enable it in settings.",
              [
                { text: "Open Settings", onPress: () => Linking.openSettings() }, // Opens app settings
                { text: "Cancel", style: "cancel" },
              ]
            );
            return false;
          }
        } else {
          // For Android 11 (API Level 30+) - only request READ_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true; // Permission granted
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            Alert.alert(
              "Permissions Required",
              "This app needs storage permissions to function properly. Please grant them.",
              [
                { text: "Retry", onPress: () => requestPermissions() }, // Retry request
                { text: "Cancel", style: "cancel" }, // Cancel button
              ]
            );
            return false;
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
              "Permissions Required",
              "You've denied the permission permanently. Please enable it in settings.",
              [
                { text: "Open Settings", onPress: () => Linking.openSettings() }, // Opens app settings
                { text: "Cancel", style: "cancel" },
              ]
            );
            return false;
          }
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };
  
    // Handler for navigating to PDF Viewer
    const handleOpenPdfViewer = async () => {
      //const permissionGranted = await requestPermissions();
      //if (permissionGranted) {
        navigation.navigate('PdfViewer');
      //}
    };
  
    // Handler for navigating to Manual Save screen
    const handleOpenManualSave = async () => {
      //const permissionGranted = await requestPermissions();
      //if (permissionGranted) {
        navigation.navigate('ManualSave');
      //}
    };
  
    // Handler for navigating to Manual Save screen
    const handlePdfFormFilling = async () => {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        navigation.navigate('ProgrammaticFormFilling');
      }
    };
    
    // Handler for navigating to Manual Save screen
    const handleDynamicFormFilling = async () => {
      //const permissionGranted = await requestPermissions();
      //if (permissionGranted) 
      {
        navigation.navigate('DynamicFormFillingScreen');
      }
    };
    
    // Handler for navigating to Manual Save screen
    const handleMergePdfs = async () => {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        navigation.navigate('MergePdfDocs');
      }
    };
    
    // Handler for navigating to Manual Save screen
    const handleFlatternPdfs = async () => {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        navigation.navigate('FlatternPdf');
      }
    };
    
    // Handler for navigating to Manual Save screen
    const handleSample1Pdfs = async () => {
      // const permissionGranted = await requestPermissions();
      //if (permissionGranted) 
      {
        navigation.navigate('SampleScreen1');
      }
    };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      
      <Button
        title="Go to PdfViewer"
        onPress={handleOpenPdfViewer}
      />
      <Button
        title="Go to Manual Save"
        onPress={handleOpenManualSave}
      />
      <Button
        title="Pdf Form Fill"
        onPress={handlePdfFormFilling}
      />
      <Button
        title="Dynamic Form Fill"
        onPress={handleDynamicFormFilling}
      />
      <Button
        title="Merge Pdf Docs"
        onPress={handleMergePdfs}
      />
      <Button
        title="Flattern Pdf"
        onPress={handleFlatternPdfs}
      />
      
      <Button
        title="9Pack Pdf Sample1"
        onPress={handleSample1Pdfs}
      />
    </View>
  );
}

export default HomeScreen;
