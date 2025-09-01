import React from 'react'
import {Tool} from 'sanity'
import {Button, Card, Text} from '@sanity/ui'

const VERCEL_WEBHOOK_URL =
  'https://api.vercel.com/v1/integrations/deploy/prj_Sp0sprKa4kuKtNSqLwDLnJvcJAkg/D4AgV9efHj'

export const deployTool: Tool = {
  name: 'deploy',
  title: 'Deploy to Vercel',
  component: function DeployTool() {
    const handleDeploy = async () => {
      try {
        const res = await fetch(VERCEL_WEBHOOK_URL, {
          method: 'POST',
        })
        if (res.ok) {
          alert('Deployment trigerred, please wait!')
        } else {
          alert('Failed to trigger deployment')
        }
      } catch (err) {
        console.error(err)
        alert('Error triggering deployment')
      }
    }

    return (
      <Card padding={4}>
        <Text size={2} weight="semibold" style={{marginBottom: 20}}>
          Deploy to Vercel
        </Text>
        <Button text="Trigger Deploy" tone="primary" onClick={handleDeploy} />
      </Card>
    )
  },
}
