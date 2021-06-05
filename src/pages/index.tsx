import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Button, Stack } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { AuthContext } from '../contexts/AuthContext'
import { Input } from '../components/Form/Input'

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail deve ser válido'),
  password: yup.string().required('Senha é obrigatória'),
})

export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data)
  }

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        w='100%'
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={formState.errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (cookies['dashgo.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}