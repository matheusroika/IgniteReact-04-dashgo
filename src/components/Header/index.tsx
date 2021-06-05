import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { User } from '../../contexts/AuthContext'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

interface HeaderProps {
  user?: User;
}

export function Header({ user = null }: HeaderProps) {
  const { onOpen } = useSidebarDrawer()

  const isWideScreen = useBreakpointValue({
    base: false,
    md: true,
  })

  const showSearchBox = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as='header'
      w='100%'
      maxW={1480}
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
    >
      { !isWideScreen && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          onClick={onOpen}
          fontSize="24"
          variant="unstyled"
          mr="2"
        />
      )}
      <Logo />

      { showSearchBox && <SearchBox /> }
      
      <Flex align='center' ml='auto'>
        <NotificationNav />
        <Profile user={user} showProfileData={isWideScreen} />
      </Flex>
    </Flex>
  )
}