import { FiltersKeyType } from "@/constants/data";
import { Config } from "@/core/config";
import { useEffect, useState } from "react";

export interface ImageDataI {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface ImageDataResponseI {
  total: number;
  totalHits: number;
  hits: ImageDataI[];
}

// const apiURL = `${Config.PIXABAY_API_URL}?key=${Config.PIXABAY_API_KEY}`;
const apiURL = "https://pixabay.com/api/?key=35360285-44bf1fd8a1da6933b82e1924d";

// console.log("api url",apiURL)

interface Props {
  page?: number;
  perPage?: number;
  safeSearch?: boolean;
  editors?: boolean;
  q?: string;
  category?: string;
  filters?: Record<FiltersKeyType, string>;
}

export const usefetchImages = ({
  page = 1,
  perPage = 25,
  safeSearch = true,
  editors = true,
  q = "",
  category = "",
  filters = {
    order: "",
    orientation: "",
    type: "",
    colors: "",
  },
}: Props = {}) => {
  
  const [data, setData] = useState<ImageDataResponseI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const headers = {
        //   "Content-Type": "application/json",
        //   Accept: "*/*",
        //   "X-Requested-With": "XMLHttpRequest",
        // };
        const headers = {
          // "Content-Type": "application/json",
          Accept: "application/json",
        };

        let url = `${apiURL}&safesearch=${safeSearch}&editors_choice=${editors}&page=${page}&per_page=${perPage}${
          q.length > 0 ? `&q=${q}` : ""
        }${category.length > 0 ? `&category=${category}` : ""}`;

        for (const filterName in filters) {
          const filterValue = filters[filterName as FiltersKeyType];
          if (!!filterValue?.length) {
            const filter = `&${filterName}=${filterValue}`;
            console.log({ filter });
            url += filter;
          }
        }
        console.log({ url });
        const data = await fetch(url, {
          method: "GET",
          headers,
        }).then((res) => res.json());

        setData(data);
      } catch (error: any) {
        console.log({ error });
        setError(`${error}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [page, q, category, filters]);

  return {
    data,
    loading,
    error,
  };
};
