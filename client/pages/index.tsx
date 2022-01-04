import Link from 'next/link'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'

const IndexPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data: user, refetch: refetchUser } = trpc.useQuery(['getUser', id], {
    enabled: !!id,
  })
  const { data: users, refetch: refetchUsers } = trpc.useQuery(['getUsers'])
  const createUser = trpc.useMutation(['createUser'])
  const deleteUser = trpc.useMutation(['deleteUser'])
  const updateUser = trpc.useMutation(['updateUser'])

  return (
    <div>
      <p>{user?.name}</p>

      <ul>
        {users?.map((u) => (
          <li key={u.id}>
            <Link href={`/?id=${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={async () => {
          const name = prompt('Name')

          if (name) {
            const newUser = await createUser.mutateAsync({ name })

            router.push(`/?id=${newUser.id}`)
          }
        }}
      >
        Add user
      </button>

      {user && (
        <>
          <button
            onClick={async () => {
              const newName = prompt('New name')

              if (newName) {
                const newUser = await updateUser.mutateAsync({
                  id,
                  patch: { name: newName },
                })

                refetchUsers()
                refetchUser()
              }
            }}
          >
            Update user
          </button>

          <button
            onClick={async () => {
              const isUserDeleted = await deleteUser.mutateAsync(id)

              if (isUserDeleted) {
                router.push(`/`)
              }
            }}
          >
            Delete user
          </button>
        </>
      )}
    </div>
  )
}

export default IndexPage
