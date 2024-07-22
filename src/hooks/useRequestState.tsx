import { useState } from "react";

export default function useRequestState<DataT, ErrorT = string>() {

    const [data, setData] = useState<DataT>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorT>();
    const [requestDone, setRequestDone] = useState(false);

    return {
        data,
        setData,
        isLoading,
        setIsLoading,
        error,
        setError,
        requestDone,
        setRequestDone
    }
}
