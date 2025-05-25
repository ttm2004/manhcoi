window.open = function(url) {
    console.log("👉 Đang mở bài thi:", url);
    setTimeout(() => {
        const win = window.open(
            url,
            "_blank",
            "width=1200,height=800,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes"
        );

        const injectGPTSupport = () => {
            try {
                const d = win.document;

                // Gỡ hạn chế popup
                ['oncontextmenu', 'onkeydown', 'onkeypress', 'onmousedown', 'oncopy', 'oncut'].forEach(event => {
                    d[event] = null;
                    d.body[event] = null;
                    Object.defineProperty(d, event, { get: () => null, set: () => {}, configurable: true });
                    Object.defineProperty(d.body, event, { get: () => null, set: () => {}, configurable: true });
                });
                console.log("🟢 Đã gỡ hạn chế thành công!");

                // Tạo box hiển thị kết quả từ ChatGPT
                const resultBox = d.createElement('div');
                resultBox.style.position = 'fixed';
                resultBox.style.bottom = '10px';
                resultBox.style.right = '10px';
                resultBox.style.maxWidth = '400px';
                resultBox.style.maxHeight = '300px';
                resultBox.style.overflowY = 'auto';
                resultBox.style.background = '#fff';
                resultBox.style.border = '1px solid #ccc';
                resultBox.style.padding = '10px';
                resultBox.style.zIndex = 9999;
                resultBox.style.fontSize = '14px';
                resultBox.style.whiteSpace = 'pre-wrap';
                resultBox.innerText = '🧠 GPT sẵn sàng tra cứu...';
                d.body.appendChild(resultBox);

                // Lắng nghe Enter khi có văn bản được bôi
                d.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const selected = d.getSelection().toString().trim();
                        if (selected.length === 0) return;

                        resultBox.innerText = "🔍 Đang tra cứu: " + selected;

                        // Gọi ChatGPT qua API
                        fetch("https://api.openai.com/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer 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" 
                            },
                            body: JSON.stringify({
                                model: "gpt-3.5-turbo",
                                messages: [
                                    { role: "user", content: `Giải câu trắc nghiệm sau và giải thích rõ ràng bằng tiếng Việt:\n${selected}` }
                                ],
                                temperature: 0.5
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            const content = data.choices?.[0]?.message?.content || "❌ Không nhận được phản hồi.";
                            resultBox.innerText = content;
                        })
                        .catch(err => {
                            resultBox.innerText = "❌ Lỗi khi kết nối GPT: " + err;
                        });
                    }
                });

            } catch (e) {
                console.warn("⏳ Chờ popup tải xong...");
                setTimeout(injectGPTSupport, 500);
            }
        };
        injectGPTSupport();
    });
};
