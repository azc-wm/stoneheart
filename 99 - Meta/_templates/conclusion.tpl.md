<%*
const Enums = tp.user.enums;

// --- Title ---
const title = (await tp.system.prompt("Conclusion title (the conclusion itself)"))?.trim();
if (title) await tp.file.rename(title);

// --- Enum paths ---
const DOMAINS = "99 - Meta/_templates/_enums/domains.md";
const TYPES   = "99 - Meta/_templates/_enums/types.md";
const TOPICS  = "99 - Meta/_templates/_enums/topics.md";

// --- Load enums ---
const domains = await Enums.readEnumList(app, DOMAINS);
const types   = await Enums.readEnumList(app, TYPES);
let topics    = await Enums.readEnumList(app, TOPICS);

// --- Core metadata ---
const domain = await tp.system.suggester(domains, domains);
const type   = await tp.system.suggester(types, types);

// --- Topics (multi-select, ESC to finish) ---
let selectedTopics = [];

while (true) {
  const remaining = topics.filter(t => !selectedTopics.includes(t));

  const choice = await tp.system.suggester(
    ["(new topic)", ...remaining],
    ["__new__", ...remaining],
    false,
    `[Select topics – ESC to finish]\nSelected: ${selectedTopics.join(", ")}`
  );

  if (!choice) break;

  if (choice === "__new__") {
    let newTopic = Enums.normalize(await tp.system.prompt("New topic"));
    if (!newTopic) newTopic = "misc";

    if (!topics.includes(newTopic)) {
      await Enums.appendEnum(app, TOPICS, newTopic);
      topics.push(newTopic);
    }

    if (!selectedTopics.includes(newTopic)) {
      selectedTopics.push(newTopic);
    }
  } else {
    if (!selectedTopics.includes(choice)) {
      selectedTopics.push(choice);
    }
  }
}

if (selectedTopics.length === 0) selectedTopics = ["misc"];

// --- Conclusion (required) ---
let conclusion = "";
while (!conclusion) {
  conclusion = (await tp.system.prompt(
    "Conclusion (what will you do / believe differently going forward?)"
  ))?.trim();
}

// --- Optional provenance ---
const derivedFrom = (await tp.system.prompt(
  "Derived from (optional – link to process / incident / project)"
))?.trim();

const today = tp.date.now("YYYY-MM-DD");
%>
---
type: conclusion
domain: <% JSON.stringify(domain) %>
category: <% JSON.stringify(type) %>
topics: <% JSON.stringify(selectedTopics) %>
status: active
date: <% today %>
derived_from: <% derivedFrom ? JSON.stringify(derivedFrom) : "[]" %>
---
## Conclusion
> <% conclusion %>

## Context
What work, process, or situation led to this conclusion?

## Evidence / Signals
What observations, incidents, metrics, or experiences support it?

## Trade-offs
What this optimizes for — and what it explicitly sacrifices.

## Consequences
What changes going forward because of this conclusion?

## Review triggers
When should this conclusion be questioned or revisited?

## Related
- [[ ]]
