// ════════════════════════════════════════════════════════
//  Storytrace 需求表 — Google Apps Script
//  貼到 Google Sheets → 擴充功能 → Apps Script
// ════════════════════════════════════════════════════════

const SHEET_ID   = '1v3cA-d8sN4owG3P1osSmIsl00CfI19RpXXrCMDZ4VPU';  // ← 已設定好
const NOTIFY_EMAIL = 'ray@karbonxgaiaentertainment.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // ── 寫入 Google Sheets ──
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    // 如果是第一筆，加標題列
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '時間戳記', '姓名', '公司', '電話', 'Email', 'LINE',
        '活動名稱', '活動類型', '活動日期', '活動地點', '預計人數',
        '主題色', '活動標語', '素材需求', '功能需求', '預算規模',
        '備註', '來源'
      ]);
      // 標題列格式
      sheet.getRange(1, 1, 1, 18)
        .setBackground('#0D0D0D')
        .setFontColor('#C9A84C')
        .setFontWeight('bold');
    }

    // 寫入資料
    sheet.appendRow([
      new Date(),
      data['姓名']   || '',
      data['公司']   || '',
      data['電話']   || '',
      data['Email']  || '',
      data['LINE']   || '',
      data['活動名稱'] || '',
      data['活動類型'] || '',
      data['活動日期'] || '',
      data['活動地點'] || '',
      data['預計人數'] || '',
      data['主題色'] || '',
      data['活動標語'] || '',
      data['素材需求'] || '',
      data['功能需求'] || '',
      data['預算規模'] || '',
      data['備註']   || '',
      data['來源']   || '',
    ]);

    // ── 寄 email 通知 ──
    const subject = `【Storytrace 新需求】${data['活動名稱'] || '未填'} — ${data['姓名'] || '未填'}`;
    const body = `
收到一筆新的 Storytrace 活動需求表！

━━━━━━━━━━━━━━━━━━━━━━━━
▌ 聯絡資訊
姓名：${data['姓名'] || '—'}
公司：${data['公司'] || '—'}
電話：${data['電話'] || '—'}
Email：${data['Email'] || '—'}
LINE：${data['LINE'] || '—'}

▌ 活動資訊
活動名稱：${data['活動名稱'] || '—'}
活動類型：${data['活動類型'] || '—'}
活動日期：${data['活動日期'] || '—'}
活動地點：${data['活動地點'] || '—'}
預計人數：${data['預計人數'] || '—'}

▌ 品牌視覺
主題色：${data['主題色'] || '—'}
活動標語：${data['活動標語'] || '—'}
素材：${data['素材需求'] || '—'}

▌ 功能需求
${data['功能需求'] || '—'}

▌ 預算規模：${data['預算規模'] || '—'}

▌ 備註：
${data['備註'] || '—'}

▌ 來源：${data['來源'] || '—'}
━━━━━━━━━━━━━━━━━━━━━━━━
查看所有需求表記錄：
https://docs.google.com/spreadsheets/d/${SHEET_ID}
    `.trim();

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, {
      replyTo: data['Email'] || '',
    });

    // ── 回傳成功 ──
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS 支援
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
