# Mobile-First Web Terminal for "Vibe Coding"

Turn your smartphone into a capable coding companion. This is a specialized web-based terminal designed specifically for **running TUI LLM tools (like Gemini CLI, Claude, Vibe) and terminal multiplexers (Zellij) from your phone.**

## Why this exists?

I wanted to "vibe code" on my server using powerful CLI AI tools while on the go. However, existing solutions fell short:

*   **Chat Bots (Telegram/Matrix):** Great for text, but terrible for interactive TUIs (Text User Interfaces) like `zellij`, `vim`, or `vibe`. Rate limits and lack of cursor control kill the flow.
*   **Existing Web Terminals (ttyd):** Excellent on desktop, but unusable on mobile. The keyboard covers the screen, modifier keys (Ctrl/Alt) are missing, and scrolling is a nightmare.
*   **SSH Clients (Termux):** Good, but they isolate you from your server's browser session loop and don't offer the specific custom controls needed for rapid TUI navigation.

## The Solution

**Mobile-First Web Terminal** is a lightweight Node.js/WebSocket app that provides:

1.  **Mobile-Optimized Toolbar:** A sticky toolbar above your keyboard with the critical keys missing from phone keyboards (`Esc`, `Tab`, `Ctrl`, `Alt`, `|`, `Arrows`).
2.  **Zellij Integration:** Dedicated controls for Zellij (Pane navigation, Scroll mode, Lock toggle), making terminal multiplexing effortless on a touch screen.
3.  **Auto-Resizing:** The terminal dynamically resizes when your on-screen keyboard pops up, keeping your cursor always in view.
4.  **Touch Scrolling:** Solves the notorious "web terminal scroll" issue by enabling native touch scrolling for history navigation.
5.  **Unlimited Output:** No message length limits like Telegram. Stream huge logs or code blocks instantly via WebSockets.

## Features

*   **"New Session" Prompt:** Quickly launch `bash`, `gemini`, `claude`, `vibe`, or any custom command.
*   **Smart Modifier Keys:** A sticky "Alt" toggle that lets you execute complex shortcuts (like `Alt+F` or `Alt+Left`) with single taps.
*   **Navigation Macros:** Dedicated buttons for `PageUp`, `PageDown`, and history scrolling (`Buf⬆`/`Buf⬇`).
*   **Text Selection:** Native browser text selection works for copying code snippets.

## Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/sepiropht/mobile-term.git
    cd mobile-term
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```

4.  **Connect:**
    Open your phone's browser and navigate to `http://<your-server-ip>:3000`.

## "Vibe Coding" Workflow

1.  Open the app on your phone.
2.  Tap **New S.** and type `zellij`.
3.  Use the toolbar to split panes (`Alt` then `n`).
4.  In one pane, run `gemini` or `claude` to generate code.
5.  In the other pane, run `vim` to edit or `node` to run it.
6.  Use the **Z-Scroll** button to review long LLM outputs comfortably.

## License

ISC
