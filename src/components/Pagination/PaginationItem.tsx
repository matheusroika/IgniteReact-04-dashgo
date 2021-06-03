import { Button } from "@chakra-ui/react";
import { getUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";


interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ number, onPageChange, isCurrent = false }: PaginationItemProps) {
  async function handlePrefetchPage(page: number) {
    await queryClient.prefetchQuery(['users', page], () => getUsers(page), {
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  if (isCurrent) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        width='4'
        colorScheme='pink'
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      bg='gray.700'
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
      onMouseEnter={() => handlePrefetchPage(number)}
    > 
      {number}
    </Button>
  )
}