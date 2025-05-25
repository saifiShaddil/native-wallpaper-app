import { View, Text, Image, StyleSheet } from "react-native";
import { ImageDataI } from "@/data/images";
import { MasonryFlashList } from "@shopify/flash-list";
import { ImageCard } from "./ImageCard";
import { getColumns } from "@/helpers/common";

interface Props {
  images: ImageDataI[];
}

export const ImagesGrid = ({ images }: Props) => {
  const columns = getColumns();
  return (
    <View>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => <ImageCard index={index} image={item} columns={columns} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
});
