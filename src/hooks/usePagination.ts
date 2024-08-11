import graphglQueryAction from "@/graphql/graphglQueryAction";
import { GraphqlQueryType } from "@/graphql/types";
import { useEffect, useState } from "react";

type PagiationResponse<DataType, ResourcesName extends keyof any> = {
  [key in ResourcesName]: DataType[];
} & { areThereMore: boolean };
type QueryResponse<
  DataType,
  QueryName extends keyof any,
  ResourcesName extends keyof any
> = {
  [key in QueryName]: PagiationResponse<DataType, ResourcesName>;
};
type UsePaginationProps<
  DataType,
  QueryName extends keyof any,
  ResourcesName extends keyof any
> = {
  variables?: Record<string, unknown>;
  Query: GraphqlQueryType<QueryResponse<DataType, QueryName, ResourcesName>>;
  onDataLoad: (
    res: QueryResponse<DataType, QueryName, ResourcesName>
  ) => PagiationResponse<DataType, "data">;
  defaultValues?: DefaultValuesTypes<DataType>;
  options?: Options;
};
type DefaultValuesTypes<DataType> = {
  data?: DataType[];
  isLoading?: boolean;
  areThereMoreData?: boolean;
  error?: string;
  paginationModel?: PaginationModel;
};
type Options = {
  skipFirstPageFetch?: boolean;
};

const defaultPaginationModel: PaginationModel = {
  page: 1,
  pageSize: 15,
};

export default function usePagination<
  DataType,
  QueryName extends keyof any,
  ResourcesName extends keyof any
>({
  Query,
  onDataLoad,
  variables,
  defaultValues,
  options,
}: UsePaginationProps<DataType, QueryName, ResourcesName>) {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>(
    defaultPaginationModel
  );
  const [data, setData] = useState<DataType[]>(defaultValues?.data ?? []);
  const [areThereMoreData, setAreThereMoreData] = useState(
    defaultValues?.areThereMoreData ?? true
  );
  const [isLoading, setIsLoading] = useState(defaultValues?.isLoading ?? false);
  const [error, setError] = useState(defaultValues?.error ?? "");

  function getData(paginationOptions: PaginationModel) {
    setIsLoading(true);
    graphglQueryAction<QueryResponse<DataType, QueryName, ResourcesName>>(
      JSON.stringify(Query),
      {
        ...variables,
        paginationOptions,
      }
    )
      .then(async (res) => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const { areThereMore, data } = onDataLoad(res.data);
        if (res.data) {
          setData((state) => [...state, ...data]);
          setPaginationModel(paginationOptions);
          if (!areThereMore) {
            setAreThereMoreData(false);
          }
        }
        error && setError("");
      })
      .catch((error) => setError(error?.message))
      .finally(() => setIsLoading(false));
  }

  function loadMore() {
    if (areThereMoreData && !isLoading) {
      const nextPage = {
        ...paginationModel,
        page: paginationModel.page + 1,
      };
      setPaginationModel(nextPage);
      getData(nextPage);
    }
  }

  function addData(data: DataType) {
    setData((state) => [data, ...state]);
  }

  function updateData(
    select: (data: DataType) => boolean,
    update: (data: DataType) => DataType
  ) {
    setData((state) => {
      return state.map((data) => {
        if (select(data)) {
          return update(data);
        }
        return data;
      });
    });
  }

  function removeData(select: (data: DataType) => boolean) {
    setData((data) => data.filter(select));
  }

  useEffect(() => {
    areThereMoreData &&
      !options?.skipFirstPageFetch &&
      getData(paginationModel);
  }, []);

  return {
    data,
    isLoading,
    error,
    loadMore,
    paginationModel,
    addData,
    updateData,
    removeData,
    areThereMoreData,
  };
}
