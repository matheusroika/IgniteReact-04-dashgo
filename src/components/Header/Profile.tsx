import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext)

  return (
    <Flex align='center'>
      { showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Matheus Roika</Text>
          <Text color='gray.300' fontSize='small'>
            {user ? user.email : 'Sem e-mail'}
          </Text>
        </Box>
      )}
      
      <Button variant='unstyled' onClick={signOut}>
        <Avatar size='md' name='Matheus Roika' src='https://github.com/matheusroika.png' />
      </Button>
    </Flex>
  )
}