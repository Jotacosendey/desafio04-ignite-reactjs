import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImagesResponse {
  data: Image[];
  after: string | null;
}

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    const { data } = await api.get<ImagesResponse>('/api/images', {
      params: {
        after: pageParam
      }
    })

    return data;
  }


  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: (lastPage, pages) => lastPage.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.map(page => {
      return page.data;
    }).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {
          hasNextPage && (
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              marginTop="6"
            >
              {
                isFetchingNextPage
                  ? 'Carregando...'
                  : hasNextPage
                    ? 'Carregar mais'
                    : ''
              }
            </Button>
          )}
      </Box>
    </>
  );
}
