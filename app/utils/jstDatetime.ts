const pad = (n: number) => String(n).padStart(2, '0')

const TOKEN_PATTERN = /\[([^\]]*)\]|YYYY|MM|DD|HH|mm|ss|Z|M|D/g

/* UTC日付をJSTにして返す */
export const jstDatetime = (
  utcDatetime: string | undefined,
  format: string = 'YYYY-MM-DDTHH:mm:ssZ[Z]'
) => {
  if (!utcDatetime) return ''

  // JSTはUTC+9固定（DSTなし）なのでオフセットを加算してUTCフィールドとして読み出す
  const jst = new Date(new Date(utcDatetime).getTime() + 9 * 60 * 60 * 1000)

  const tokens: Record<string, string> = {
    YYYY: String(jst.getUTCFullYear()),
    MM: pad(jst.getUTCMonth() + 1),
    M: String(jst.getUTCMonth() + 1),
    DD: pad(jst.getUTCDate()),
    D: String(jst.getUTCDate()),
    HH: pad(jst.getUTCHours()),
    mm: pad(jst.getUTCMinutes()),
    ss: pad(jst.getUTCSeconds()),
    Z: '+09:00',
  }

  return format.replace(TOKEN_PATTERN, (match, literal) =>
    literal !== undefined ? literal : tokens[match]
  )
}