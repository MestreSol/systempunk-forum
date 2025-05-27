/
├── app/
│   ├── layout.tsx           # Template “root” (Template-level)
│   ├── page.tsx             # Página inicial (Page-level)
│   ├── globals.css
│   ├── providers.tsx
│   ├── (dashboard)/         # Rota /dashboard
│   │   ├── layout.tsx       # Template de dashboard (Template-level)
│   │   └── page.tsx         # Página /dashboard (Page-level)
│   └── api/                 # Route Handlers
│
├── components/
│   ├── atoms/               # Elementos mais simples, sem dependências
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Spinner.tsx
│   │
│   ├── molecules/           # Combinações de átomos
│   │   ├── FormField.tsx    # Label + Input + ErrorMessage
│   │   ├── IconButton.tsx   # Button + Icon
│   │   └── Card.tsx         # Image + Heading + Text
│   │
│   ├── organisms/           # Seções compostas por moléculas e átomos
│   │   ├── Header.tsx       # Logo + NavMenu + SearchField
│   │   ├── Footer.tsx       # Links + Copyright
│   │   └── ProductList.tsx  # Lista de ProductCard organisms
│   │
│   ├── templates/           # Estruturas de página sem conteúdo específico
│   │   ├── MainLayout.tsx   # Header + Footer + <main>{children}</main>
│   │   └── DashboardLayout.tsx
│   │
│   └── pages/               # (opcional) helpers/redux específicos de página
│
├── features/                # (opcional) domínio–driven, com co-locação de atoms/molecules
│   └── auth/
│       ├── components/      # átomos/moléculas exclusivas de auth
│       ├── hooks/
│       └── services/
│
├── hooks/                   # Hooks genéricos (useMediaQuery etc.)
├── lib/                     # Helpers puros (fetcher, date-utils)
├── context/                 # Contextos globais (Theme, Auth)
├── styles/                  # Tokens de design, variáveis CSS/Sass
├── public/                  # assets estáticos
├── next.config.js
├── tsconfig.json
└── package.json
