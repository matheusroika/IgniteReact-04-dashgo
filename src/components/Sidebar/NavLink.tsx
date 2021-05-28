import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import Link from 'next/link'
import { useRouter } from "next/router";

interface NavLinkProps {
  icon: IconType;
  text: string;
  href: string;
}

export function NavLink({ icon, text, href }: NavLinkProps) {
  const { asPath } = useRouter()
  const isActive = asPath === '/' ? false : asPath.startsWith(href)
  
  return (
    <Link href={href} passHref>
      <ChakraLink color={isActive ? 'pink.400' : 'gray.50'} display='flex' align='center' >
        <Icon as={icon} fontSize='20' />
        <Text ml='4' fontWeight='medium'>{text}</Text>
      </ChakraLink>
    </Link>
  )
}