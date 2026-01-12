function readEnumList(app, path) {
  var file = app.vault.getAbstractFileByPath(path);
  if (!file) return Promise.resolve([]);

  return app.vault.read(file).then(function (content) {
    return content
      .split("\n")
      .map(function (l) { return l.trim(); })
      .filter(function (l) { return l && !l.startsWith("#"); })
      .map(function (l) { return l.replace(/^-+\s*/, "").trim(); })
      .filter(Boolean);
  });
}

function normalize(value) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_]/g, "");
}

function appendEnum(app, path, value) {
  var file = app.vault.getAbstractFileByPath(path);
  if (!file) return Promise.resolve();

  var v = normalize(value);
  if (!v) return Promise.resolve();

  return readEnumList(app, path).then(function (items) {
    if (items.indexOf(v) !== -1) return;

    var next = items.slice();
    next.push(v);
    next = Array.from(new Set(next)).sort(function (a, b) {
      return a.localeCompare(b);
    });

    var out = next.map(function (x) { return "- " + x; }).join("\n") + "\n";
    return app.vault.modify(file, out);
  });
}

module.exports = {
  readEnumList: readEnumList,
  normalize: normalize,
  appendEnum: appendEnum
};
