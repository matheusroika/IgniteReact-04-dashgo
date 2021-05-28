import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import Link from 'next/link'

interface NavLinkProps {
  icon: IconType;
  text: string;
  href: string;
}

export function NavLink({ icon, text, href }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display='flex' align='center' >
        <Icon as={icon} fontSize='20' />
        <Text ml='4' fontWeight='medium'>{text}</Text>
      </ChakraLink>
    </Link>
  )
}