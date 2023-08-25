import { api } from "@/lib/api";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Prisma, UsuarioTipo } from "@prisma/client";
import { hashSync } from "bcryptjs";

async function geraDepartamentos() {
  if ((await api.get("/departamento/conta")).data === 0) {
    [
      {
        nome: "Igreja Adventista",
        abreviacao: "Igreja",
        imagem: "/img/departamentos/geral_g3qsxx.jpg",
      },
      {
        nome: "Ação Solidária Adventista",
        abreviacao: "ASA",
        imagem: "/img/departamentos/asa_pas3gh.jpg",
      },
      {
        nome: "Aventureiros",
        abreviacao: "Aventureiros",
        imagem: "/img/departamentos/aventureiros_phrgvm.jpg",
      },
      {
        nome: "Comunicação",
        abreviacao: "Comunicação",
        imagem: "/img/departamentos/comunicacao_khxnyr.jpg",
      },
      {
        nome: "Desbravadores",
        abreviacao: "Desbravadores",
        imagem: "/img/departamentos/desbravadores_bdgmzz.jpg",
      },
      {
        nome: "Educação",
        abreviacao: "Educação",
        imagem: "/img/departamentos/educacao_lo7t7l.jpg",
      },
      {
        nome: "Escola Sabatina",
        abreviacao: "Esc. Sabatina",
        imagem: "/img/departamentos/escsabatina_ekyikp.jpg",
      },
      {
        nome: "Espírito de Profecia",
        abreviacao: "Esp. Profecia",
        imagem: "/img/departamentos/espprofecia_q5fcxb.jpg",
      },
      {
        nome: "Evangelismo",
        abreviacao: "Evangelismo",
        imagem: "/img/departamentos/evangelismo_i5fndz.jpg",
      },
      {
        nome: "Liberdade Religiosa",
        abreviacao: "Lib. Religiosa",
        imagem: "/img/departamentos/libreligiosa_rgiw0h.jpg",
      },
      {
        nome: "Ministério da Criança",
        abreviacao: "Criança",
        imagem: "/img/departamentos/criancas_zeujdk.jpg",
      },
      {
        nome: "Ministério da Família",
        abreviacao: "Família",
        imagem: "/img/departamentos/familia_aqzrj9.jpg",
      },
      {
        nome: "Ministério da Mulher",
        abreviacao: "Mulher",
        imagem: "/img/departamentos/mulher_oa3mtz.jpg",
      },
      {
        nome: "Ministério da Música",
        abreviacao: "Música",
        imagem: "/img/departamentos/musica_ddnpqj.jpg",
      },
      {
        nome: "Ministério da Recepção",
        abreviacao: "Recepção",
        imagem: "/img/departamentos/recepcao_q8r7yf.jpg",
      },
      {
        nome: "Ministério de Publicações",
        abreviacao: "Publicações",
        imagem: "/img/departamentos/publicacoes_zvsdse.jpg",
      },
      {
        nome: "Ministério do Adolescente",
        abreviacao: "Adolescente",
        imagem: "/img/departamentos/adolescentes_pcnqld.jpg",
      },
      {
        nome: "Ministério Jovem",
        abreviacao: "Jovem",
        imagem: "/img/departamentos/jovens_qgbeqk.jpg",
      },
      {
        nome: "Ministério Pessoal",
        abreviacao: "Min. Pessoal",
        imagem: "/img/departamentos/minpessoal_s51mfk.jpg",
      },
      {
        nome: "Missão Global",
        abreviacao: "Mis. Global",
        imagem: "/img/departamentos/misglobal_hoy221.jpg",
      },
      {
        nome: "Mordomia Cristã",
        abreviacao: "Mordomia",
        imagem: "/img/departamentos/mordomia_chrbxj.jpg",
      },
      {
        nome: "Saúde",
        abreviacao: "Saúde",
        imagem: "/img/departamentos/saude_thjvxh.jpg",
      },
      {
        nome: "Serviço Voluntário Adventista",
        abreviacao: "Voluntários",
        imagem: "/img/departamentos/voluntarios_qugpkj.jpg",
      },
    ].map(async (dep) => {
      await api.post("/departamento/salva", dep);
    });
  }
}

async function geraTipos() {
  if ((await api.get("/tipo/conta")).data === 0) {
    [
      { nome: "Artigo" },
      { nome: "Notícia" },
      { nome: "Evento" },
      { nome: "Aviso" },
      { nome: "Devocional" },
      { nome: "Estudo" },
    ].map(async (t) => {
      await api.post("/tipo/salva", t);
    });
  }
}

async function geraDistritos() {
  if ((await api.get("/distrito/conta")).data === 0) {
    const numItens = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < numItens; i++) {
      const nome = `${faker.person.firstName(
        "male",
      )} ${faker.person.lastName()} ${faker.person.lastName()}`;
      const email = faker.internet
        .email({
          firstName: nome.split(" ")[0],
          lastName: nome.split(" ")[nome.split(" ").length - 1],
        })
        .toLowerCase();
      await api.post("/distrito/salva", {
        nome: faker.location.city(),
        pastor: {
          create: {
            nome,
            email,
            slug: nome
              .toLocaleLowerCase()
              .replace(new RegExp(" ", "g"), "-")
              .replace(new RegExp("\\.", "g"), "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
            genero: "masculino",
            senha: hashSync(email.split("@")[0], 12),
            dataNasc: faker.date.birthdate({ min: 18, max: 65 }),
            bio: faker.lorem.sentence(),
            foto: faker.image.avatar(),
            whatsApp: faker.phone.number("63 992##-####"),
            instagram: `https://instagram.com/${faker.internet
              .displayName({
                firstName: nome.split(" ")[0],
                lastName: nome.split(" ")[nome.split(" ").length - 1],
              })
              .toLowerCase()}`,
            tipoUsuario: faker.helpers.arrayElement(["pastor"]),
            status: "inativo",
          },
        },
      } as Prisma.DistritoCreateInput);
    }
  }
}

async function geraLocais() {
  if ((await api.get("/local/conta")).data === 0) {
    const numItens = faker.number.int({ min: 2, max: 8 });

    for (let i = 0; i < numItens; i++) {
      const endereco = faker.location.streetAddress(false);
      const bairro = faker.lorem
        .sentence({ min: 1, max: 2 })
        .replace(new RegExp("\\.", "g"), "");
      await api.post("/local/salva", {
        nome: faker.company.name(),
        endereco: `${endereco.split(" ")[2]} ${endereco.split(" ")[1]}, ${
          endereco.split(" ")[0]
        }, ${bairro}`,
        latitude: faker.location.latitude().toLocaleString(),
        longitude: faker.location.longitude().toLocaleString(),
      } as Prisma.LocalCreateInput);
    }
  }
}

async function geraIgrejas() {
  if ((await api.get("/igreja/conta")).data === 0) {
    await geraLocais();
    const { data: distritoIds } = await api.get<{ id: string }[]>(
      "/distrito/retorna?campos=id",
    );
    distritoIds.map(async (d) => {
      const numItens = faker.number.int({ min: 2, max: 8 });

      for (let i = 0; i < numItens; i++) {
        const endereco = faker.location.streetAddress(false);
        const bairro = faker.lorem
          .sentence({ min: 1, max: 2 })
          .replace(new RegExp("\\.", "g"), "");
        await api.post("/igreja/salva", {
          distrito: { connect: { id: d.id } },
          local: {
            create: {
              nome: `IASD ${bairro}`,
              endereco: `${endereco.split(" ")[2]} ${endereco.split(" ")[1]}, ${
                endereco.split(" ")[0]
              }, ${bairro}`,
              latitude: faker.location.latitude().toLocaleString(),
              longitude: faker.location.longitude().toLocaleString(),
            },
          },
          foto: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
        } as Prisma.IgrejaCreateInput);
      }
    });
  }
}

async function geraUsuarios() {
  const comuns = (await api.get("/usuario/conta?tipo=comum")).data;
  const admins = (await api.get("/usuario/conta?tipo=administrador")).data;

  if (comuns + admins === 0) {
    const { data: igrejaIds } = await api.get<{ id: string }[]>(
      "/igreja/retorna?campos=id",
    );

    igrejaIds.map(async (ig) => {
      const numItens = faker.number.int({ min: 1, max: 5 });
      for (let i = 0; i < numItens; i++) {
        const genero = faker.person.sex();
        const nome = `${faker.person.firstName(
          genero === "Masculino" ? "male" : "female",
        )} ${faker.person.lastName()} ${faker.person.lastName()}`;

        await api.post("/usuario/salva", {
          nome,
          email: faker.internet
            .email({
              firstName: nome.split(" ")[0],
              lastName: nome.split(" ")[nome.split(" ").length - 1],
            })
            .toLowerCase(),
          genero: genero.toLowerCase(),
          dataNasc: faker.date.birthdate({ min: 18, max: 65 }),
          bio: faker.lorem.sentence(),
          foto: faker.image.avatar(),
          whatsApp: faker.phone.number("63 992##-####"),
          instagram: `https://instagram.com/${faker.internet
            .displayName({
              firstName: nome.split(" ")[0],
              lastName: nome.split(" ")[nome.split(" ").length - 1],
            })
            .toLowerCase()}`,
          tipoUsuario: faker.helpers.arrayElement(["comum", "administrador"]),
          status: "inativo",
          igreja: { connect: { id: ig.id } },
        } as Prisma.UsuarioCreateInput);
      }
    });
  }
}

async function geraTags() {
  if ((await api.get("/tag/conta")).data === 0) {
    const numItens = faker.number.int({ min: 25, max: 40 });
    for (let i = 0; i < numItens; i++) {
      const tag = faker.lorem.word();
      if ((await api.get(`/tag/conta?busca=${tag}`)).data === 0) {
        await api.post("/tag/salva", { nome: tag } as Prisma.TagCreateInput);
      }
    }
  }
}

async function geraTextos() {
  if ((await api.get("/texto/conta")).data === 0) {
    const numItens = faker.number.int({ min: 70, max: 150 });
    for (let i = 0; i < numItens; i++) {
      const tipo = faker.helpers.arrayElement(
        (
          await api.get<{ id: string; nome: string }[]>(
            "/tipo/retorna?campos=id-nome",
          )
        ).data,
      );
      const deps = faker.helpers.arrayElements(
        (await api.get<{ id: string }[]>("/departamento/retorna?campos=id"))
          .data,
        { min: 1, max: 3 },
      );
      const igreja = faker.helpers.arrayElement(
        (
          await api.get<{ id: string; local: Prisma.LocalSelect }[]>(
            "/igreja/retorna?campos=id-local",
          )
        ).data,
      );
      const usuario = faker.helpers.arrayElement(
        (
          await api.get<
            {
              id: string;
              igreja: Prisma.IgrejaSelect;
              tipoUsuario: UsuarioTipo;
              distrito: Prisma.DistritoSelect;
            }[]
          >("/usuario/retorna?campos=id-igreja-tipoUsuario-distrito")
        ).data,
      );

      const tags = faker.helpers.arrayElements(
        (await api.get<{ id: string }[]>("/tag/retorna?campos=id")).data,
        { min: 1, max: 4 },
      );

      await api.post("/texto/salva", {
        tipo: { connect: { id: tipo.id } },
        departamentos: { connect: deps.map((d) => ({ id: d.id })) },
        autor: { connect: { id: usuario.id } },
        igreja: usuario.igreja
          ? { connect: { id: usuario.igreja.id } }
          : undefined,
        distrito:
          usuario.tipoUsuario === "pastor"
            ? { connect: { id: usuario.distrito.id } }
            : undefined,
        tags: { connect: tags.map((t) => ({ id: t.id })) },
        imagem: faker.helpers.maybe(() =>
          faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
        ),
        video: faker.helpers.maybe(
          () =>
            `https://youtube.com/watch?v=${faker.string.alphanumeric({
              length: {
                min: 6,
                max: 8,
              },
            })}`,
        ),
        evento:
          tipo.nome === "Evento"
            ? {
                create: {
                  data: faker.date.soon({ days: 30 }),
                  local: { connect: { id: igreja.local.id } },
                },
              }
            : undefined,
        titulo:
          tipo.nome !== "Aviso"
            ? faker.lorem
                .sentence({ min: 3, max: 6 })
                .replace(new RegExp("\\.", "g"), "")
            : null,
        subtitulo:
          tipo.nome !== "Aviso"
            ? faker.helpers.maybe(() =>
                faker.lorem.sentences({ min: 1, max: 3 }),
              )
            : null,
        conteudo:
          tipo.nome !== "Aviso"
            ? faker.lorem
                .paragraphs(faker.number.int({ min: 2, max: 8 }), "<br/>")
                .split("<br/>")
                .map((p, i) => {
                  return i === 0
                    ? `<p>${p}</p>`
                    : faker.helpers.arrayElement([
                        `<p>${p}</p>`,
                        `<img src="${faker.image.urlPicsumPhotos({
                          width: 600,
                          height: 480,
                        })}" alt="${faker.lorem.sentence({
                          min: 1,
                          max: 4,
                        })}"/><p>${p}</p>`,
                      ]);
                })
                .join("")
            : faker.lorem.sentences({ min: 1, max: 2 }),
        fonte: faker.helpers.maybe(() => faker.internet.url()),
        status: "publicado",
        publicadoEm: faker.date.recent({ days: 30 }),
      } as Prisma.TextoCreateInput);
    }
  }
}

async function geraComentarios() {
  if ((await api.get("/comentario/conta")).data === 0) {
    if ((await api.get("/texto/conta")).data !== 0) {
      const { data: txtIds } =
        await api.get<{ id: string }[]>("/texto/retorna");
      txtIds.map(async (t) => {
        const numItens = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < numItens; i++) {
          await api.post("/comentario/salva", {
            texto: { connect: { id: t.id } },
            titulo: faker.lorem
              .sentence({ min: 2, max: 5 })
              .replace(new RegExp("\\.", "g"), ""),
            conteudo: faker.lorem.paragraph({ min: 1, max: 4 }),
            autor: `${faker.person.fullName()}`,
          } as Prisma.ComentarioCreateInput);
        }
      });
    }
  }
}

async function geraAnuncios() {
  if ((await api.get("/anuncio/conta")).data === 0) {
    const { data: igrejasIds } =
      await api.get<{ id: string }[]>("/igreja/retorna");
    const { data: aviso } = await api.get<{ id: string }[]>(
      "/tipo/retorna?busca=Aviso&campos=id",
    );
    const { data: evento } = await api.get<{ id: string }[]>(
      "/tipo/retorna?busca=Evento&campos=id",
    );

    igrejasIds.map(async (i) => {
      const { data: avisoIds } = await api.get<{ id: string }[]>(
        `/texto/retorna?limite=${faker.number.int({
          min: 1,
          max: 3,
        })}&igrejaId=${i.id}&tipoId=${aviso[0].id}&campos=id`,
      );
      const { data: eventoIds } = await api.get<{ id: string }[]>(
        `/texto/retorna?limite=${faker.number.int({
          min: 1,
          max: 3,
        })}&igrejaId=${i.id}&tipoId=${evento[0].id}&campos=id`,
      );

      const slides = avisoIds.concat(eventoIds);

      await api.post("/anuncio/salva", {
        igreja: { connect: { id: i.id } },
        data: faker.date.recent({ days: 7 }),
        slides: { connect: slides.map((s) => ({ id: s.id })) },
      } as Prisma.AnuncioCreateInput);
    });
  }
}

async function geraPaginas() {
  if ((await api.get("/pagina/conta")).data === 0) {
    const usuarios = (
      await api.get<{ id: string }[]>("/usuario/retorna?campos=id")
    ).data;
    const tags = (await api.get<{ id: string }[]>("/tag/retorna?campos=id"))
      .data;

    [...new Array(faker.number.int({ min: 3, max: 8 }))].map(async () => {
      await api.post("/pagina/salva", {
        autor: { connect: { id: faker.helpers.arrayElement(usuarios).id } },
        titulo: faker.lorem
          .sentence({ min: 1, max: 3 })
          .replace(new RegExp("\\.", "g"), ""),
        subtitulo: faker.lorem.sentences({ min: 1, max: 3 }),
        conteudo: faker.lorem
          .paragraphs(faker.number.int({ min: 2, max: 8 }), "<br/>")
          .split("<br/>")
          .map((p, i) => {
            return i === 0
              ? `<p>${p}</p>`
              : faker.helpers.arrayElement([
                  `<p>${p}</p>`,
                  `<img src="${faker.image.urlPicsumPhotos({
                    width: 600,
                    height: 480,
                  })}" alt="${faker.lorem.sentence({
                    min: 1,
                    max: 4,
                  })}"/><p>${p}</p>`,
                ]);
          })
          .join(""),
        tags: {
          connect: faker.helpers
            .arrayElements(tags, { min: 1, max: 5 })
            .map((t) => ({ id: t.id })),
        },
        comentarios: {
          createMany: {
            data: [...new Array(faker.number.int({ min: 1, max: 8 }))].map(
              () => ({
                titulo: faker.lorem.words({ min: 1, max: 5 }),
                conteudo: faker.lorem.sentences({ min: 1, max: 3 }),
                autor: `${faker.person.firstName()} ${faker.person.lastName()}`,
              }),
            ),
          },
        },
      } as Prisma.PaginaCreateInput);
    });
  }
}

export async function geraDados() {
  // await geraDepartamentos();
  // await geraTipos();
  // await geraDistritos();
  // await geraIgrejas();
  // await geraUsuarios();
  // await geraTags();
  // await geraTextos();
  // await geraComentarios();
  // await geraAnuncios();
  // await geraPaginas();
}
