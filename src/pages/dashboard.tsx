import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import ptBR from 'apexcharts/dist/locales/pt-br.json'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAuthClient } from "../services/api";
import { useCan } from "../hooks/useCan";
import { Can } from "../components/Can";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const chartOptions = {
  chart: {
    defaultLocale: 'pt-br',
    locales: [ptBR],
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime' as 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021=05=23T00:00:00.000Z',
      '2021=05=24T00:00:00.000Z',
      '2021=05=25T00:00:00.000Z',
      '2021=05=26T00:00:00.000Z',
      '2021=05=27T00:00:00.000Z',
      '2021=05=28T00:00:00.000Z',
      '2021=05=29T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  },
}

const chartSeries = [
  {name: 'series1', data: [31, 120, 10, 28, 51, 18, 109]}
]

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' maxW={1480} my='6' mx='auto' px='6' >
        <Sidebar />

        <Can permissions={['metrics.list']}>
          <SimpleGrid flex='1' gap='4' minChildWidth={320} align='flex-start'>
            <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
              <Text fontSize='lg' mb='4'>Inscritos da semana</Text>
              <Chart options={chartOptions} series={chartSeries} type='area' height={160} />
            </Box>

            <Box p={['6', '8']} bg='gray.800' borderRadius={8} pb='4'>
              <Text fontSize='lg' mb='4'>Taxa de abertura</Text>
              <Chart options={chartOptions} series={chartSeries} type='area' height={160} />
            </Box>
          </SimpleGrid>
        </Can>
        
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const authApi = setupAuthClient(ctx)
  const { data } = await authApi.get('/me')

  return {
    props: {}
  }
})