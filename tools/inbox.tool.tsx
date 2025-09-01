import {definePlugin, useClient} from 'sanity'
import {Card, Flex, Box, Button, Text, Inline, Spinner} from '@sanity/ui'
import {useEffect, useState} from 'react'

export const inboxTool = definePlugin({
  name: 'inbox-tool',
  tools: [
    {
      name: 'inbox',
      title: 'Inbox',
      component: InboxTool,
    },
  ],
})

function InboxTool() {
  const client = useClient({apiVersion: '2023-01-01'})
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const query = `*[_type == "message"] 
        | order(starred desc, viewed asc, createdAt desc) {
          _id, name, email, message, starred, viewed, createdAt
        }`
      const result = await client.fetch(query)
      setMessages(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleStar = async (msg: any) => {
    await client.patch(msg._id).set({starred: !msg.starred}).commit()
    fetchMessages()
  }

  const handleViewed = async (msg: any) => {
    await client.patch(msg._id).set({viewed: true}).commit()
    fetchMessages()
  }

  const handleDelete = async (msg: any) => {
    await client.delete(msg._id)
    fetchMessages()
  }

  if (loading) return <Spinner muted />
  if (error) return <Text>Error: {error}</Text>

  // Grouping
  const starred = messages.filter((m) => m.starred)
  const unread = messages.filter((m) => !m.starred && !m.viewed)
  const read = messages.filter((m) => !m.starred && m.viewed)

  const renderSection = (title: string, items: any[]) =>
    items.length > 0 && (
      <Box marginBottom={5}>
        <Text weight="bold" size={2}>
          {title}
        </Text>
        <Flex marginTop={2} direction="column" gap={3}>
          {items.map((msg: any) => (
            <Card
              key={msg._id}
              padding={3}
              radius={2}
              shadow={1}
              tone={msg.starred ? 'primary' : 'default'}
            >
              <Flex justify="space-between" align="center">
                <Flex direction="column" gap={3}>
                  <Text weight="semibold">{msg.name}</Text>
                  <Text size={1} muted>
                    {msg.email}
                  </Text>
                  <Text size={1}>{msg.message}</Text>
                  {!msg.viewed && <Text size={1}>🔴 Unread</Text>}
                </Flex>
                <Inline space={2}>
                  {!msg.viewed && <Button text="Mark Viewed" onClick={() => handleViewed(msg)} />}
                  <Button text={msg.starred ? 'Unstar' : 'Star'} onClick={() => handleStar(msg)} />
                  <Button text="Delete" tone="critical" onClick={() => handleDelete(msg)} />
                </Inline>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Box>
    )

  return (
    <Flex direction="column" gap={4} padding={4}>
      {renderSection('⭐ Starred', starred)}
      {renderSection('🔴 Unread', unread)}
      {renderSection('✅ Read', read)}
    </Flex>
  )
}

export default InboxTool
