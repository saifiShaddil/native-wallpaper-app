import { View, Pressable, StyleSheet, Alert, Platform } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ImageDataI } from "@/data/images";
import { getImageSize } from "@/helpers/common";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

interface Props {
  image: ImageDataI;
  index: number;
  columns: number;
}

export const ImageCard = ({ image, index, columns }: Props) => {
  const getImageHeight = () => {
    const { imageHeight, imageWidth } = image;
    return { height: getImageSize(imageWidth, imageHeight) };
  };

  // const handleDownload = async (imageUrl: string) => {
  //   try {
  //     // Check for media library permissions
  //     let { status } = await MediaLibrary.getPermissionsAsync();

  //     if (status !== "granted") {
  //       const permission = await MediaLibrary.requestPermissionsAsync();
  //       status = permission.status;
  //     }

  //     // if (status !== "granted") {
  //     //   const message = "Please allow access to the media library to save images.";
  //     //   if (Platform.OS === "web") {
  //     //     alert(`Permission Required: ${message}`);
  //     //   } else {
  //     //     Alert.alert("Permission Required", message);
  //     //   }
  //     //   return;
  //     // }

  //     // Download the image to a local file
  //     const fileName = `${Date.now()}.jpg`;
  //     const fileUri = FileSystem.documentDirectory + fileName;
  //     // console.log("file uri", fileUri);

  //     const downloadResumable = FileSystem.createDownloadResumable(imageUrl, fileUri);
  //     const result = await downloadResumable.downloadAsync();

  //     if (!result || !result.uri) {
  //       throw new Error("Download failed");
  //     }

  //     // Save the file to media library
  //     const asset = await MediaLibrary.createAssetAsync(result.uri);
  //     await MediaLibrary.createAlbumAsync("Downloaded Images", asset, false);

  //     Alert.alert("Success", "Image downloaded successfully!");
  //   } catch (error) {
  //     console.error("Download Error:", error);
  //     Alert.alert("Error", "Failed to download image.");
  //   }
  // };

  const handleDownload = async (imageUrl: string) => {
    if (Platform.OS === 'web') {
      try {
        const response = await fetch(imageUrl, { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        } 
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `image_${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Release the blob URL
        URL.revokeObjectURL(blobUrl);
        // alert('Image download started.');
      } catch (err) {
        console.error('Web download error:', err);
        alert('Failed to download image on web.');
      }
      return;
    }
  
    try {
      // Native platform (iOS/Android)
      let { status } = await MediaLibrary.getPermissionsAsync();
  
      if (status !== 'granted') {
        const permission = await MediaLibrary.requestPermissionsAsync();
        status = permission.status;
      }
  
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to the media library to save images.');
        return;
      }
  
      const fileName = `${Date.now()}.jpg`;
      const fileUri = FileSystem.documentDirectory + fileName;
  
      const downloadResumable = FileSystem.createDownloadResumable(imageUrl, fileUri);
      const result = await downloadResumable.downloadAsync();
  
      if (!result || !result.uri) {
        throw new Error('Download failed');
      }
  
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      await MediaLibrary.createAlbumAsync('Downloaded Images', asset, false);
  
      Alert.alert('Success', 'Image downloaded successfully!');
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  return (
    <Pressable onPress={() => handleDownload(image.webformatURL)} className="rounded-xl overflow-hidden m-1">
      <Image source={image.webformatURL} style={[styles.image, getImageHeight()]} transition={100} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
});
