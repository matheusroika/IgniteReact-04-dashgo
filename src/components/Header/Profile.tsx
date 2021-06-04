import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
  user: User;
}

export function Profile({ user, showProfileData = true }: ProfileProps) {
  return (
    <Flex align='center'>
      { showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Matheus Roika</Text>
          <Text color='gray.300' fontSize='small'>
            {user.email}
          </Text>
        </Box>
      )}

      <Avatar size='md' name='Matheus Roika' src='https://github.com/matheusroika.png' />
    </Flex>
  )
}