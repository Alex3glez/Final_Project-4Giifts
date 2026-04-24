import { useEffect, useState } from 'react'
import { createClient } from '@sanity/client'
import { Card, Stack, Text, Heading, Badge, Box, Flex, Button, Spinner } from '@sanity/ui'

const client = createClient({
  projectId: 'c3139aap',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

function colorDot(color) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: color || '#ccc',
        border: '2px solid rgba(0,0,0,0.15)',
        marginRight: 6,
        verticalAlign: 'middle',
      }}
    />
  )
}

export function ThemeDashboardWidget() {
  const [themes, setThemes] = useState([])
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    client
      .fetch(
        `*[_type == "season"] | order(priority desc, startDate asc) {
          _id, name, isActive, startDate, endDate, priority,
          colorPrimary, colorSecondary, colorAccent,
          featuredEmoji, bannerMessage
        }`
      )
      .then((data) => {
        setThemes(data)
        // Determine the active theme using the same logic as the frontend
        const forced = data.find((t) => t.isActive)
        if (forced) {
          setActive(forced)
        } else {
          const byDate = data.find(
            (t) => t.startDate <= today && t.endDate >= today
          )
          setActive(byDate || null)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const upcoming = themes
    .filter((t) => !t.isActive && t.startDate > today)
    .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
    .slice(0, 4)

  const forcedCount = themes.filter((t) => t.isActive).length

  if (loading) {
    return (
      <Card padding={5} radius={3} shadow={1} tone="default">
        <Flex align="center" gap={3}>
          <Spinner muted />
          <Text muted size={1}>Cargando temas estacionales…</Text>
        </Flex>
      </Card>
    )
  }

  return (
    <Stack space={4}>
      {/* Header */}
      <Card padding={4} radius={3} shadow={1} tone="primary">
        <Flex align="center" justify="space-between">
          <Stack space={2}>
            <Heading size={2}>🎨 Panel de Temporadas</Heading>
            <Text size={1} muted>
              {themes.length} temas · {forcedCount > 0 ? `${forcedCount} forzado(s) activo(s)` : 'ninguno forzado'}
            </Text>
          </Stack>
          <Text size={4}>{active?.featuredEmoji || '🎁'}</Text>
        </Flex>
      </Card>

      {/* Active Theme */}
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <Heading size={1}>✅ Tema activo ahora</Heading>
            {active?.isActive && (
              <Badge tone="positive" fontSize={0}>FORZADO MANUALMENTE</Badge>
            )}
          </Flex>

          {active ? (
            <Card
              padding={3}
              radius={2}
              style={{
                background: active.colorPrimary + '18',
                borderLeft: `4px solid ${active.colorPrimary}`,
              }}
            >
              <Stack space={2}>
                <Flex align="center" gap={1}>
                  {colorDot(active.colorPrimary)}
                  {colorDot(active.colorSecondary)}
                  {colorDot(active.colorAccent)}
                  <Text size={2} weight="semibold" style={{ marginLeft: 8 }}>
                    {active.featuredEmoji} {active.name}
                  </Text>
                </Flex>
                {active.startDate && (
                  <Text size={1} muted>
                    📅 {active.startDate} → {active.endDate || '∞'}
                  </Text>
                )}
                {active.bannerMessage && (
                  <Text size={1} muted>
                    💬 &quot;{active.bannerMessage}&quot;
                  </Text>
                )}
                <Text size={1} muted>
                  Prioridad: {active.priority}
                </Text>
              </Stack>
            </Card>
          ) : (
            <Card padding={3} radius={2} tone="caution">
              <Text size={1}>⚠️ Ninguna temporada activa para hoy ({today}). Se mostrará el tema Default.</Text>
            </Card>
          )}
        </Stack>
      </Card>

      {/* Upcoming Themes */}
      {upcoming.length > 0 && (
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Heading size={1}>🗓 Próximas temporadas</Heading>
            <Stack space={2}>
              {upcoming.map((t) => {
                const daysUntil = Math.ceil(
                  (new Date(t.startDate) - new Date(today)) / (1000 * 60 * 60 * 24)
                )
                return (
                  <Card key={t._id} padding={3} radius={2} shadow={1}>
                    <Flex align="center" justify="space-between">
                      <Flex align="center" gap={2}>
                        {colorDot(t.colorPrimary)}
                        <Text size={1} weight="semibold">
                          {t.featuredEmoji} {t.name}
                        </Text>
                      </Flex>
                      <Stack space={1} style={{ textAlign: 'right' }}>
                        <Text size={0} muted>{t.startDate}</Text>
                        <Badge tone={daysUntil <= 14 ? 'caution' : 'default'} fontSize={0}>
                          en {daysUntil} días
                        </Badge>
                      </Stack>
                    </Flex>
                  </Card>
                )
              })}
            </Stack>
          </Stack>
        </Card>
      )}

      {/* Quick Stats */}
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={3}>
          <Heading size={1}>📊 Resumen</Heading>
          <Flex gap={3} wrap="wrap">
            <Card padding={3} radius={2} tone="positive" style={{ flex: '1', minWidth: 100 }}>
              <Stack space={1}>
                <Heading size={3}>{themes.filter((t) => t.isActive).length}</Heading>
                <Text size={0} muted>Forzados activos</Text>
              </Stack>
            </Card>
            <Card padding={3} radius={2} tone="primary" style={{ flex: '1', minWidth: 100 }}>
              <Stack space={1}>
                <Heading size={3}>{upcoming.length}</Heading>
                <Text size={0} muted>Próximas</Text>
              </Stack>
            </Card>
            <Card padding={3} radius={2} tone="default" style={{ flex: '1', minWidth: 100 }}>
              <Stack space={1}>
                <Heading size={3}>{themes.length}</Heading>
                <Text size={0} muted>Total temas</Text>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Card>

      <Text size={0} muted style={{ textAlign: 'center' }}>
        Última actualización: {new Date().toLocaleTimeString('es-ES')}
      </Text>
    </Stack>
  )
}
