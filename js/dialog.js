// 全局头像点击对话框（奶油色）
(function() {
    // 配置（你可以自己调整偏移和时长）
    const CONFIG = {
        offsetX: 116,    // 水平偏移（正右负左）
        offsetY: -34,    // 垂直偏移（正下负上）
        duration: 4666,  // 显示时长（毫秒）
        clickOutsideClose: true,
    };

    const introMessages = [
        "我是宇宙煎饼，喜欢漫画、动画、发呆...",
        "最近沉迷搞网站。",
        "漫画弹窗——我的得意之作！桀桀桀",
        "在想面条的事🍜...",
        "喵喵喵~",
        "Love and Peace~",
        "I'm Space Jianbing...meow?",
        "你没活干吗？",
        "我的头像来自我的oc动物塑。",
        "🌯🥞🌯❤"
    ];

    function initDialog() {
        const avatarLink = document.querySelector('.site-avatar a');
        if (!avatarLink) return;

        let dialog = document.getElementById('creamy-dialog');
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.id = 'creamy-dialog';
            dialog.className = 'creamy-dialog';
            document.body.appendChild(dialog);
        }

        function showDialog(e) {
            e.preventDefault();
            const randomMsg = introMessages[Math.floor(Math.random() * introMessages.length)];
            dialog.textContent = randomMsg;

            const avatarRect = avatarLink.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

            let left = avatarRect.left + scrollLeft + CONFIG.offsetX;
            let top = avatarRect.top + scrollTop + CONFIG.offsetY;

            // 临时显示以获取尺寸
            dialog.style.display = 'block';
            dialog.style.opacity = '0';
            const dialogRect = dialog.getBoundingClientRect();
            const dialogWidth = dialogRect.width;
            const dialogHeight = dialogRect.height;
            dialog.style.display = 'none';

            // 边界修正
            if (left + dialogWidth > document.documentElement.scrollWidth) {
                left = document.documentElement.scrollWidth - dialogWidth - 10;
            }
            if (left < 10) left = 10;
            if (top < 10) top = avatarRect.top + scrollTop + avatarRect.height + 5;
            if (top + dialogHeight > window.innerHeight + scrollTop) {
                top = avatarRect.top + scrollTop - dialogHeight - 5;
            }

            dialog.style.left = left + 'px';
            dialog.style.top = top + 'px';
            dialog.style.display = 'block';
            dialog.style.opacity = '1';

            setTimeout(() => {
                dialog.style.opacity = '0';
                setTimeout(() => {
                    if (dialog.style.opacity === '0') dialog.style.display = 'none';
                }, 300);
            }, CONFIG.duration);
        }

        avatarLink.addEventListener('click', showDialog);

        if (CONFIG.clickOutsideClose) {
            document.addEventListener('click', function(e) {
                if (!avatarLink.contains(e.target) && dialog.style.display === 'block') {
                    dialog.style.opacity = '0';
                    setTimeout(() => {
                        if (dialog.style.opacity === '0') dialog.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDialog);
    } else {
        initDialog();
    }
})();