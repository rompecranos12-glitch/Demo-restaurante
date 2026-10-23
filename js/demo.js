// haze · demo para presentar en el local.
// Monta las pantallas reales de la librería (window.Haze) en un recorrido:
// Presentación → Carta → Cocina → Mozo → Dueño → Tu marca → Evento.
// Sin servidor: todo corre en el navegador con los datos de ejemplo de la
// librería. La estación se guarda en el #ancla para poder abrir una directo;
// #completa abre la carta sola, a pantalla completa, para mostrarla en el celular.
(function () {
    const h = React.createElement;
    const { useState, useEffect, useRef } = React;
    const H = window.Haze;

    const ESTACIONES = [
        { id: 'presentacion', l: 'Presentación' },
        { id: 'carta', l: 'Carta' },
        { id: 'cocina', l: 'Cocina' },
        { id: 'mozo', l: 'Mozo' },
        { id: 'duenio', l: 'Dueño' },
        { id: 'marca', l: 'Tu marca' },
        { id: 'evento', l: 'Evento' },
    ];
    const DUENIO = [
        { id: 'platos', l: 'Platos', C: H.DishEditor },
        { id: 'reportes', l: 'Reportes', C: H.AdminReports },
        { id: 'opiniones', l: 'Opiniones', C: H.FeedbackInbox },
        { id: 'qr', l: 'QR de las mesas', C: H.QRSheet },
        { id: 'usuarios', l: 'Equipo y permisos', C: H.AdminUsers },
    ];

    const leerHash = () => {
        const [e, s] = String(location.hash || '').replace('#', '').split('-');
        if (e === 'completa') return { est: 'carta', sub: 'platos', completa: true };
        return { est: ESTACIONES.some((x) => x.id === e) ? e : 'presentacion', sub: DUENIO.some((x) => x.id === s) ? s : 'platos' };
    };
    const horaCarta = () => { const x = new Date().getHours(); return x >= 7 && x < 24 ? x : 21; };

    // Pantalla completa: además de tapar la consola, se le pide al navegador
    // que esconda sus barras. En el iPhone o dentro de otra página no siempre
    // deja; la carta igual ocupa toda la pantalla.
    const pedirPantalla = () => {
        try {
            const r = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({ navigationUI: 'hide' });
            if (r && r.catch) r.catch(() => {});
        } catch (e) { /* sin pantalla completa del navegador */ }
    };
    const soltarPantalla = () => {
        try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch (e) { /* nada */ }
    };
    const abrirCompleta = () => { pedirPantalla(); location.hash = 'completa'; };
    const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
    const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };

    // ── Piezas ──
    const Cabecera = ({ ojo, titulo, children }) => h('header', { className: 'dm-head' },
        h('span', { className: 'label-caps' }, ojo),
        h('h1', { className: 'display-lg' }, titulo),
        children ? h('p', { className: 'body' }, children) : null);

    function Siguiente({ ir, actual }) {
        const i = ESTACIONES.findIndex((x) => x.id === actual);
        const sig = ESTACIONES[i + 1];
        if (!sig) {
            return h('div', { className: 'dm-sig' },
                h('p', { className: 'story' }, 'Ese es el recorrido completo. Volvé a la carta para que lo pruebe quien tenés enfrente.'),
                h('button', { type: 'button', className: 'dm-btn dm-btn--prim', onClick: () => ir('carta') }, 'Volver a la carta'));
        }
        return h('div', { className: 'dm-sig' },
            h('p', { className: 'body-sm' }, 'Siguiente en el recorrido'),
            h('button', { type: 'button', className: 'dm-btn dm-btn--prim', onClick: () => ir(sig.id) }, sig.l + ' →'));
    }

    // En el celular el recorrido se pasa con el pulgar, desde abajo.
    function Pulgar({ ir, actual }) {
        const i = ESTACIONES.findIndex((x) => x.id === actual);
        const ant = ESTACIONES[i - 1], sig = ESTACIONES[i + 1];
        return h('nav', { className: 'dm-pulgar', 'aria-label': 'Anterior y siguiente' },
            h('button', { type: 'button', className: 'dm-pulgar__b', disabled: !ant, onClick: () => ant && ir(ant.id), 'aria-label': ant ? 'Anterior: ' + ant.l : 'Anterior' }, '‹'),
            h('span', { className: 'dm-pulgar__txt' },
                h('b', null, ESTACIONES[i].l),
                h('span', { className: 'caption' }, (i + 1) + ' de ' + ESTACIONES.length)),
            sig
                ? h('button', { type: 'button', className: 'dm-pulgar__b dm-pulgar__b--sig', onClick: () => ir(sig.id) }, sig.l + ' ›')
                : h('button', { type: 'button', className: 'dm-pulgar__b dm-pulgar__b--sig', onClick: abrirCompleta }, 'Ver la carta ›'));
    }

    // ── Estaciones ──
    function Presentacion({ ir }) {
        const pasos = [
            ['El cliente escanea el QR', 'Se abre la carta de su mesa, en su idioma, sin bajar nada ni registrarse.'],
            ['Elige y pide', 'Fotos reales, alérgenos, punto de cocción y extras. Varios en la mesa suman al mismo pedido.'],
            ['Cocina y mozo lo reciben', 'Cada tanda llega al sector que corresponde; el mozo ve el estado de cada mesa.'],
            ['Paga y opina', 'Divide la cuenta, paga con Mercado Pago y elige si contar en privado o reseñar en Google.'],
        ];
        const roles = [
            ['carta', 'Cliente', 'La carta en el celular, de la entrada a la reseña.'],
            ['cocina', 'Cocina y barra', 'Tickets por sector, con cronómetro y aviso de demora.'],
            ['mozo', 'Mozo', 'Todas las mesas de un vistazo y los llamados al instante.'],
            ['duenio', 'Dueño', 'Platos, agotados, reportes, opiniones, QR y equipo.'],
        ];
        return h(React.Fragment, null,
            h('section', { className: 'dm-hero' },
                h('div', { className: 'dm-hero__barras', 'aria-hidden': 'true' }),
                h('div', { className: 'dm-hero__txt' },
                    h(H.Logo, { height: 64 }),
                    h('span', { className: 'label-caps' }, 'Carta digital para restaurantes'),
                    h('h1', { className: 'display-xl' }, 'La carta de tu mesa, hecha para leerse con calma.'),
                    h('p', { className: 'body' }, 'El cliente pide desde el QR, la cocina recibe cada tanda en su sector y vos ves cómo va el salón. Se ve como una carta impresa bien hecha, no como una app.'),
                    h('div', { className: 'dm-hero__acc' },
                        h('button', { type: 'button', className: 'dm-btn dm-btn--prim', onClick: abrirCompleta }, 'Abrir la carta'),
                        h('button', { type: 'button', className: 'dm-btn', onClick: () => ir('duenio') }, 'Ver el panel del dueño'))),
                h('div', { className: 'dm-hero__platos', 'aria-hidden': 'true' },
                    ['parrilla', 'pizza', 'spaghetti', 'vino-malbec-reserva'].map((p) => h(H.Plate, { key: p, photo: p, size: 150 })))),
            h('section', { className: 'dm-head' },
                h('span', { className: 'label-caps' }, 'Cómo funciona en el salón'),
                h('h2', { className: 'display-md', style: { margin: 0 } }, 'De la mesa a la cocina, sin papeles')),
            h('ol', { className: 'dm-pasos' }, pasos.map(([t, d], i) => h('li', { key: t, className: 'dm-paso' },
                h('span', { className: 'display-md dm-paso__n' }, ['I', 'II', 'III', 'IV'][i]),
                h('b', { className: 'dish-name-sm' }, t),
                h('p', { className: 'body-sm' }, d)))),
            h('section', { className: 'dm-head' },
                h('span', { className: 'label-caps' }, 'Una pantalla para cada uno'),
                h('h2', { className: 'display-md', style: { margin: 0 } }, 'Tocá para verla funcionando')),
            h('div', { className: 'dm-roles' }, roles.map(([id, t, d]) => h('button', { key: id, type: 'button', className: 'dm-rol', onClick: () => ir(id) },
                h('b', { className: 'dish-name' }, t),
                h('p', { className: 'body-sm' }, d),
                h('span', { className: 'dm-rol__ir' }, 'Ver →')))),
            h('p', { className: 'caption dm-nota' }, 'Demo con datos de ejemplo: no envía pedidos ni cobra. Los platos, precios y la marca se cambian por los del restaurante.'));
    }

    function Carta() {
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Cliente · desde el QR de la mesa', titulo: 'La carta en el celular' },
                'Probala de punta a punta: entrada, destacado del chef, ficha del plato, pedido, seguimiento, cuenta y gracias. Con el panel "Probá la carta" cambiás la hora: el menú y el tema día/noche cambian solos.'),
            h('div', { className: 'dm-completa' },
                h('button', { type: 'button', className: 'dm-btn dm-btn--prim', onClick: abrirCompleta }, '⤢  Ver en pantalla completa'),
                h('p', { className: 'body-sm' }, 'Así la ve el cliente, sin nada alrededor. Para salir, la ✕ de arriba o el botón de volver.')),
            h('div', { className: 'dm-lienzo dm-lienzo--centro' }, h('div', { className: 'hz-root' }, h(H.CartaCliente, { initialHour: horaCarta() }))));
    }

    function CartaCompleta({ salir }) {
        const ref = useRef(null);
        useEffect(() => {
            // El fondo de afuera (muesca, barras del sistema) sigue al tema de
            // la carta, que cambia con la hora: día o noche.
            const raiz = ref.current, tel = raiz && raiz.querySelector('.hz-phone');
            const copiar = () => raiz.setAttribute('data-theme', (tel && tel.getAttribute('data-theme')) || 'dia');
            copiar();
            const ob = tel ? new MutationObserver(copiar) : null;
            if (ob) ob.observe(tel, { attributes: true, attributeFilter: ['data-theme'] });
            document.documentElement.classList.add('dm-quieto');
            const tecla = (e) => { if (e.key === 'Escape') salir(); };
            window.addEventListener('keydown', tecla);
            return () => { if (ob) ob.disconnect(); soltarPantalla(); document.documentElement.classList.remove('dm-quieto'); window.removeEventListener('keydown', tecla); };
        }, []);
        return h('div', { className: 'dm-full hz-root', ref, role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Carta a pantalla completa' },
            h(H.CartaCliente, { initialHour: horaCarta(), controls: false }),
            h('button', { type: 'button', className: 'dm-full__salir', onClick: salir, 'aria-label': 'Salir de pantalla completa' }, '✕'));
    }

    function Cocina() {
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Cocina y barra · tablet en la pared', titulo: 'Cada tanda, en su sector' },
                'Los pedidos entran como tickets por sector: Cocina, Parrilla, Barra y Postres. Se avanzan con un toque y, si se pasa la demora, el ticket se marca en rojo.'),
            h('div', { className: 'dm-lienzo' }, h('div', { className: 'dm-marco' }, h(H.KitchenBoard, null))));
    }

    function Mozo() {
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Mozo · celular o tablet', titulo: 'Todo el salón de un vistazo' },
                'Cada mesa con su estado: libre, pidió, en preparación, servida o pidiendo la cuenta. Cuando alguien llama al mozo, la mesa avisa y queda arriba.'),
            h('div', { className: 'dm-lienzo' }, h('div', { className: 'hz-root dm-marco' }, h(H.TableBoard, null))));
    }

    function Duenio({ sub, irSub }) {
        const s = DUENIO.find((x) => x.id === sub) || DUENIO[0];
        const textos = {
            platos: 'Cambiás foto, precio o descripción sin ayuda técnica, y pausás un plato agotado con un clic.',
            reportes: 'Ventas, ticket promedio, horarios pico y los platos más y menos pedidos. Se exportan a Excel y PDF.',
            opiniones: 'Lo que los clientes contaron en privado, con puntaje, mesa y hora.',
            qr: 'Un QR por mesa, listo para imprimir. El número de mesa viaja en el código.',
            usuarios: 'Cada persona entra con su correo y ve solo su sector: mozo el salón, cocina sus sectores.',
        };
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Dueño · compu o tablet', titulo: 'El panel del restaurante' }, textos[s.id]),
            h('div', { className: 'dm-sub', role: 'group', 'aria-label': 'Secciones del panel' },
                DUENIO.map((x) => h('button', { key: x.id, type: 'button', 'aria-pressed': x.id === s.id, onClick: () => irSub(x.id) }, x.l))),
            h('div', { className: 'dm-lienzo' }, h('div', { className: 'hz-root dm-marco', key: s.id }, h(s.C, null))));
    }

    function Marca() {
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Personalización', titulo: 'Con los colores de tu restaurante' },
                'La misma carta toma la identidad de cada local: cambian los colores y el logo, no la forma de usarla. Acá, tres restaurantes distintos.'),
            h('div', { className: 'dm-lienzo' }, h(H.TenantThemes, { lang: 'es' })));
    }

    function Evento() {
        const [lang, setLang] = useState('es');
        return h(React.Fragment, null,
            h(Cabecera, { ojo: 'Modo evento', titulo: 'Menú degustación por pasos' },
                'Para una noche especial, la carta se cierra en un menú por pasos con horario, maridaje y precio por persona. Se cambia el idioma desde arriba.'),
            h('div', { className: 'dm-lienzo dm-lienzo--centro' },
                h('div', { className: 'dm-evento' },
                    h(H.LangSwitch, { lang, onChange: setLang }),
                    h('div', { className: 'hz-root dm-marco', style: { width: 390, maxWidth: '100%' } }, h(H.TastingMenu, { lang })))));
    }

    // ── Tema de la página ──
    function Tema() {
        const sistemaNoche = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const [noche, setNoche] = useState(() => {
            const g = leer('hz-demo-tema');
            return g ? g === 'noche' : sistemaNoche();
        });
        useEffect(() => { document.documentElement.setAttribute('data-theme', noche ? 'dark' : 'light'); }, [noche]);
        const elegir = (n) => { setNoche(n); guardar('hz-demo-tema', n ? 'noche' : 'dia'); };
        return h('div', { className: 'dm-tema', role: 'group', 'aria-label': 'Tema de la página' },
            h('button', { type: 'button', 'aria-pressed': !noche, onClick: () => elegir(false) }, 'Día'),
            h('button', { type: 'button', 'aria-pressed': noche, onClick: () => elegir(true) }, 'Noche'));
    }

    // ── App ──
    function App() {
        const [ruta, setRuta] = useState(leerHash);
        useEffect(() => {
            const f = () => { setRuta(leerHash()); window.scrollTo(0, 0); };
            window.addEventListener('hashchange', f);
            return () => window.removeEventListener('hashchange', f);
        }, []);
        const ir = (id) => { location.hash = id; };
        const irSub = (s) => { location.hash = 'duenio-' + s; };
        useEffect(() => {
            const b = document.querySelector('.dm-nav__b[aria-current="page"]');
            if (b && b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
        }, [ruta.est, ruta.completa]);
        if (ruta.completa) return h(CartaCompleta, { salir: () => ir('carta') });
        const V = { presentacion: Presentacion, carta: Carta, cocina: Cocina, mozo: Mozo, duenio: Duenio, marca: Marca, evento: Evento }[ruta.est];
        return h(React.Fragment, null,
            h('header', { className: 'dm-top' },
                h('a', { className: 'dm-marca', href: '#presentacion', 'aria-label': 'haze, volver a la presentación' },
                    h(H.Logo, { height: 26 }), h('span', { className: 'dm-marca__sep' }), h('span', { className: 'label-caps' }, 'Demo')),
                h('nav', { className: 'dm-nav', 'aria-label': 'Recorrido' }, ESTACIONES.map((x) => h('button', {
                    key: x.id, type: 'button', className: 'dm-nav__b', 'aria-current': x.id === ruta.est ? 'page' : undefined, onClick: () => ir(x.id),
                }, x.l))),
                h('button', { type: 'button', className: 'dm-top__carta', onClick: abrirCompleta, 'aria-label': 'Abrir la carta a pantalla completa' }, '⤢ Carta'),
                h(Tema, null)),
            h('main', { className: 'dm-stage', key: ruta.est },
                h(V, { ir, sub: ruta.sub, irSub }),
                ruta.est !== 'presentacion' ? h(Siguiente, { ir, actual: ruta.est }) : null),
            h(Pulgar, { ir, actual: ruta.est }));
    }

    ReactDOM.createRoot(document.getElementById('app')).render(h(App));
})();
