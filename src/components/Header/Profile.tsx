import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Matheus Roika</Text>
        <Text color='gray.300' fontSize='small'>
          matheus@roika.design
        </Text>
      </Box>

      <Avatar size='md' name='Matheus Roika' src='https://github.com/matheusroika.png' />
    </Flex>
  )
}