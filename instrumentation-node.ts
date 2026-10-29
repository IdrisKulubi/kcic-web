import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net"

// Node's happy-eyeballs gives each IPv4/IPv6 connect attempt only 250ms.
// On slower links (e.g. to UploadThing's ingest servers) every attempt is
// cut off and fetch fails with ETIMEDOUT, so allow each attempt longer.
setDefaultAutoSelectFamilyAttemptTimeout(2500)
