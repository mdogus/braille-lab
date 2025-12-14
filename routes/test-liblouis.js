// routes/test-liblouis.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const liblouis = require("liblouis");

const router = express.Router();

function getTablesDir() {
  const liblouisBuildDir = path.dirname(
    require.resolve("liblouis-build/package.json")
  );
  return path.join(liblouisBuildDir, "tables");
}

// ONE-TIME INIT
const tablesDir = getTablesDir();
liblouis.enableOnDemandTableLoading(tablesDir);
liblouis.setDataPath("/");

// 1) Sayfayı gösteren route
router.get("/liblouis", (req, res) => {
  return res.render("test-liblouis", {
    title: "Liblouis Test",
  });
});

// 2) JSON dönen API route
router.get("/api/liblouis", (req, res) => {
  try {
    const inputText = (req.query.text || "Merhaba dünya!").toString();
    const trTable = (req.query.tr || "tr-g2.ctb").toString();
    const cleanTr = trTable.replace(/^tables[\\/]/, "");

    const unicodeExists = fs.existsSync(path.join(tablesDir, "unicode.dis"));
    const trExists = fs.existsSync(path.join(tablesDir, cleanTr));
    const litDigitsExists = fs.existsSync(
      path.join(tablesDir, "litdigits6Dots.uti")
    );
    const patternsExists = fs.existsSync(
      path.join(tablesDir, "braille-patterns.cti")
    );

    const tableSpec = `tables/unicode.dis,tables/${cleanTr}`;

    const logs = [];
    liblouis.setLogLevel(liblouis.LOG.ALL);
    liblouis.registerLogCallback((level, msg) => {
      logs.push({ level, msg });
    });

    const brailleText = liblouis.translateString(tableSpec, inputText);

    return res.status(200).json({
      ok: true,
      tablesDir,
      tableSpec,
      inputText,
      brailleText,
      unicodeExists,
      trExists,
      litDigitsExists,
      patternsExists,
      logs,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || String(err),
    });
  }
});

module.exports = router;
