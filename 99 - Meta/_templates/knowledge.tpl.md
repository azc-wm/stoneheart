<%*
const Enums = tp.user.enums;

const title = (await tp.system.prompt("Title"))?.trim();
if (title) await tp.file.rename(title);

const DOMAINS = "99 - Meta/_templates/_enums/domains.md";
const TYPES   = "99 - Meta/_templates/_enums/types.md";
const TOPICS  = "99 - Meta/_templates/_enums/topics.md";

const domains = await Enums.readEnumList(app, DOMAINS);
const types   = await Enums.readEnumList(app, TYPES);
const topics  = await Enums.readEnumList(app, TOPICS);

const domain = await tp.system.suggester(domains, domains);
const type   = await tp.system.suggester(types, types);

const topicChoice = await tp.system.suggester(
  ["(new topic)", ...topics],
  ["__new__", ...topics]
);

let topic = topicChoice;
if (topicChoice === "__new__") {
  topic = Enums.normalize(await tp.system.prompt("New topic"));
  if (!topic) topic = "misc";
  await Enums.appendEnum(app, TOPICS, topic);
}
// Claim (required)
let claim = "";
while (!claim) {
  claim = (await tp.system.prompt("Claim (one clear, falsifiable sentence)"))?.trim();
}
%>---
domain: <% JSON.stringify(domain) %>
type: <% JSON.stringify(type) %>
topic: <% JSON.stringify(topic) %>
status: evergreen
---
## Claim
> <% claim %>

## Explanation

## Implications

## Related
- [[ ]]