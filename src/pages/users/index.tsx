import Link from "next/link";
import { Box, Button, Center, Checkbox, Flex, Heading, Icon, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { useQuery } from 'react-query'

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()

    return data
  })

  const isWideScreen = useBreakpointValue({
    base: false,
    md: true,
  })

  return (
    <Box>
      <Header />

      <Flex w='100%' maxW={1480} my='6' mx='auto' px='6' >
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>Usuários</Heading>

            <Link href='/users/create' passHref>
            { isWideScreen ? (
              <Button
                as="a"
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>) : (
              <IconButton
                aria-label="Editar"
                icon={<Icon as={RiAddLine} fontSize='20' />}
                as="a"
                size='sm'
                fontSize='sm'
                colorScheme='pink'
              />)
            }
            </Link>
          </Flex>

          { isLoading
            ? (
              <Center>
                <Spinner />
              </Center>
            )
            : error
              ? (
                <Center>
                  <Text>Falha ao obter dados dos usuários. Tente novamente.</Text>
                </Center>
            ) : (
              <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['0', '4', '6']}  color='gray.300' width='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideScreen && <Th>Data de cadastro</Th> }
                    <Th w='8'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={['0', '4', '6']}>
                      <Checkbox colorScheme='pink' />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight='bold'>Matheus Roika</Text>
                        <Text fontSize='sm' color='gray.300'>matheus@roika.design</Text>
                      </Box>
                    </Td>
                    { isWideScreen && <Td>04 de Abril, 2021</Td> }
                    <Td px={['0', '4', '6']} textAlign="end">
                      { isWideScreen ? (
                        <Button
                          as="a"
                          size='sm'
                          fontSize='sm'
                          colorScheme='purple'
                          leftIcon={<Icon as={RiPencilLine} fontSize='16'/>}
                        >
                          Editar
                        </Button>) : (
                        <IconButton
                          aria-label="Editar"
                          icon={<Icon as={RiPencilLine} fontSize='16' />}
                          as="a"
                          size='sm'
                          fontSize='sm'
                          colorScheme='purple'
                        />)
                      }
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
    
              <Pagination />
              </>
            )}
        </Box>
      </Flex>
    </Box>
  )
}