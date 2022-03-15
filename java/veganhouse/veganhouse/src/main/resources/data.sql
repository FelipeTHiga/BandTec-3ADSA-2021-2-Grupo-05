insert into users values
(null, 0, "62795628082", "dino@gmail.com", 1, "Dino", "sonho2022", "Sauro", null),
(null, 0, "40583711022", "flavia@gmail.com", 1, "Flávia", "compaixao2022", "Silva", null),
(null, 0, "89742562075",  "kel@gmail.com", 1, "Kel", "proposito2022", "Kenan", null);

insert into adress values
(null, "05406040", "São Paulo", "", "Pinheiros", 1, 162, "SP", "Praça Benedito Calixto"),
(null, "03613070", "São Paulo", "", "Vila Santana", 2, 37, "SP", "Rua Nossa Senhora de Montevergine"),
(null, "05042000", "São Paulo", "", "Água Branca", 3, 278, "SP", "Rua Clélia");

insert into seller values
(null, 42092159000123, "dinodmartini@yahoo.com.br", "Kerai Moda Ecologica",  "kerai_sustentavel", 1, "@kerai_sustentavel", "(11) 95807-7613"),
(null, 34584347000140, "vegseedartesanal@gmail.com", "Vegseed Artesanal",  "VegseedArtesanal", 2, "@VegseedArtesanal", "(11) 91126-8464"),
(null, 38142872000167, "adm.larvegan@gmail.com", "Lar Vegan",  "Lar_vegan", 3, "@Lar_vegan", "(11) 91184-3075");

insert into certification values
(null, "Selo Escolha sem Crueldade", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-1.png"),
(null, "Selo da Sociedade Vegetariana Brasileira", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-2.png"),
(null, "Selo da Vegan Societ", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-3.png"),
(null, "Selo The Leaping Bunny", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-4.png"),
(null, "Certificado Vegano da Organização Veganismo Brasil", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-5.png");

insert into seller_certified values
(null, 1, 1, 0), -- fkseller 1
(null, 2, 1, 0),
(null, 3, 1, 0),
(null, 4, 1, 0),
(null, 5, 1, 0),
(null, 1, 2, 0), -- fkseller 2
(null, 2, 2, 0),
(null, 3, 2, 0),
(null, 4, 2, 0),
(null, 5, 2, 0),
(null, 1, 3, 0), -- fkseller 3
(null, 2, 3, 0),
(null, 3, 3, 0),
(null, 4, 3, 0),
(null, 5, 3, 0);

insert into product values  -- fkseller 1
(null, "Acessórios", "Mochila diferenciada, confeccionada com lona de caminhão reaproveitada, várias divisorias: 1 bolso externo lateral, 1 bolso externo frontal com ziper,2 bolsos internos,1 alça de mão de 9cm,2 alças regulaveis de ombro,largura 37 cm,altura 24 cm profundidade 15cm.",
1, null, null, null, 100, 1,  "Mochila Escolar", 75.00),
(null, "Acessórios", "Uma linda e superprática bolsa feita com lona de caminhão reaproveitada, com 2 bolsos externos e 1 interno, 1 alça de ombro regulável com altura mínima de 42 cm e máxima de 72 cm. Altura: 28cm, largura: 31 cm, profundidade: 12 cm.",
1, null, null, null, 100, 1, "Bolsa carteiro", 120.50),
(null, "Vestimenta", "Serie limitada com o passaro montro (Kakaia Kuma) estampado. é um simbolo de proteção. baseado em uma lenda indigena. Calçado confeccionado em lona de garrafa pet e algodão reciclado, com solado injetado tr. Os calçados Kerai são confeccionados por mão de obra capacitada e bem remunerados fazendo assim do conceito ecofriendly uma diretriz abrangente de ponta a ponta, matéria-prima reciclada e cooperados/prestadores de serviço felizes.",
1, null, null, null, 500, 1, "SlipOn", 229.00),
(null, "Vestimenta", "Tenis Rapé confeccionado com tecido da ecosimple 30% garrafa pet e 70% algodão reciclado , solado.microexpandido dando leveza ao calçado, uso casual e temos clientes utilizando.para esportes.. ótimo desempenho. Palmilha 6 mm super confortável e de facil reyirada para higienização.",
1, null, null, null, 200, 1, "Tenis Rapé", 229.00),
(null, "Vestimenta", "Rasteira com tiras em 'X' confeccionada em tecido de garrafa PET e algodão reciclado. Os produtos Kerai são confeccionados por mão de obra capacitada e bem remunerados fazendo assim do conceito ecofriendly uma diretriz abrangente de ponta a ponta, matéria-prima reciclada e cooperados/prestadores de serviço felizes.",
1, null, null, null, 10, 1, "Rasteira", 99.00);

insert into product values  -- fkseller 2
(null, "Cosméticos", "Qual a diferença para os outros? Só a embalagem e o tamanho! Nesse modelo o cristal vem solto na embalagem, que é de plástico retornável. Líder de venda na França desde 1957, esse desodorante em formato de bastão é 100% natural, composto puramente de Alúmen de potássio, substância que possui uma poderosa ação adstringente e antisséptica que eliminam as bactérias causadoras do mau odor. Ele não bloqueia a transpiração, alias, quem foi que disse que não é legal transpirar? É através da transpiração que controlamos a temperatura do nosso corpo, eliminamos as toxinas e radicais livres, um dos maiores causadores do envelhecimento. O Desodorante Cristal Mineral permite que a pele respire, diferente dos antitranspirantes que fazem com que seus ingredientes (principalmente o cloridrato de alumínio) se dissolvam no suor e vire uma espécie de gel que tampa os poros. O produto não tem perfume, álcool, parabenos, amônia ou cloridrato de alumínio, que são substâncias que afetam o nosso organismo e o meio ambiente. Adequado para todos os tipos de pele. Evita pelos encravados e melhora as axilas escurecidas.",
2, null, null, null, 5, 1, "Desodorante Cristal" , 87.40),
(null, "Cosméticos", "CREME DENTAL EPIORGANIC 90g - Natural - Vegano - Sem Flúor da BIOZENTHI *Produto natural, vegano e sem glúten, parabeno e flúor. Produto próprio para celíacos, pessoas sensíveis ao glúten ou em dieta livre de glúten. *Com 90% de ingredientes naturais o Creme Dental conta com alguns diferenciais como a Argila branca que é um componente abrasivo não irritante, Malva que ajuda a diminuir a formação de afta e o Xylitol que é um ativo não cariogênico, o que colabora com a diminuição de cáries. Além de assinar com todos os nossos selos o Creme Dental não possui Flúor em sua composição. *PRINCIPAIS INGREDIENTES: Com extrato de malva, aloe vera, calêndula e óleo essencial de menta?. *INDICAÇÃO: Higiene bucal diária.",
2, null, null, null, 50, 1, "Creme Dental" , 13.86),
(null, "Cosméticos", "Produzido com componentes naturais, orgânicos e atóxicos, o repelente natural hidratante traz em sua composição Extrato de Cravo da Índia, Óleo de Macadamia extra virgem (mínimo 50%), Óleos Essenciais de Tea Tree e Neem. Sua fórmula simples, segura e eficaz garante proteção e hidratação por até 3 horas. Produto com Registro ANVISA e Certificado Vegano.",
2, null, null, null, 25, 1, "Repelente Natural" , 45.90);

insert into product values  -- fkseller 3
(null, "Alimentos", "Embalagem com 500g de Cobertura Sabor Chocolate, formato em gotas para uso culinário - Zero Leite, Zero Glúten, Zero Soja, 100% Vegano. Ingredientes: açúcar, cacau em pó, gordura vegetal de palmiste. Contém: emulsificante lecitina de girassol, aromatizante vanilina, estabilizante PGPR. Alérgicos: Pode conter traços de castanha-de-caju, amêndoas, avelãs e amendoim. Não contém glúten. Não contém lactose. Não contém proteínas do leite. Não contém soja. Não contém ovos.",
3, null, null, null, 300, 1, "Gotas de chocolate vegano", 40.00),
(null, "Alimentos", "Chips de Batata Doce Liofilizada Tomate e Ervas 30g. Equivalente a 100g de Batata doce in natura. Zero fritura/óleo.. Contém tudo Qpod! Nossas batatas possuem todos os benefícios da batata doce sem nenhuma fritura. É só batata e nosso tempero secreto! Sua crocância é garantida pelo processo de liofilização, o mesmo usado nas comidas dos astronautas. É tão bom que você vai se sentir no céu e sem nenhuma culpa! Na liofilização as batatas são cozidas, congeladas e sob pressão, todos o líquido é removido do estado sólido diretamente para o gasoso, mantendo todos os nutrientes e a aparência da batata in natura. A redução de peso se deve à retirada da água.",
3, null, null, null, 3, 1, "Chips de Batata Doce", 11.82),
(null, "Alimentos", "O QUE É? O Requeijão Vegano em pó 100g WVegan é um produto único, tem sabor e textura de requeijão, sem adição de nenhum ingrediente de origem animal. É fabricada a partir de óleos vegetais. Pode auxiliar na redução do colesterol sanguíneo, possui vitamina E (um poderoso antioxidante natural), oferecendo uma boa opção para substituição de requeijão para veganos. NÃO CONTÉM GLÚTEN. Não contém quantidades significativas de proteínas, gorduras trans e fibras alimentares. (*) % Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.",
3, null, null, null, 50, 1, "Requeijão em Pó", 16.99),
(null, "Saúde", "(coco) Cocos nucifera oil, (bacuri) Platonia insignis butter, (cupuaçu) Theobroma grandiflorum butter, (cacau) Theobroma cacao butter, (carnaúba) Copernicia prurifera wax, (fácula de araruta) Maranta arundinacea root powder, (camomila) Matricaria chamomilla flower extract, (confrey) Symphytum officinale leaf extract, (calêndula) Calendula officinalis flower extract, Melaleuca alternifólia oil**, (lavanda) Lavandula officinalis essencial oil, zinc oxide, (vitE) Tocopheryl Acetate and Rosmarinus Officinalis Oleoresin Extract.",
3, null, null, null, 25, 1, "Pomada - Basalsamo", 22.50),
(null, "Saúde", "Óleo Essencial de Hortelã – Mentha piperita Atenção e Frescor 100% Natural Produto Vegano 12 mL Benefícios psicoemocionais: Faz parte do grupo de óleos essenciais estimulantes, sendo indicado para pessoas tímidas e desanimadas. O aroma intenso da hortelã ajuda a revigorar a alma, dando suporte para que a realização de transformação de emoções como raiva, medo, trauma e histeria; isto porque elas são desbloqueadas e liberadas. O óleo essencial de hortelã purifica a mente, ajuda a clarear as idéias e deixa a pessoa mais proativa, mais dinâmica. Há também estimulo da concentração, melhora da memória, diminui o estresse e a fadiga, melhora a agilidade da mente e a organiza. É indicado para estudantes, para pessoas necessitam de foco na vida e no trabalho, sendo interessante o seu uso para aromatizar ambientes como salas de aulas e escritórios. Benefícios Corporais e Estéticos: indicado para os males do aparelho digestivo como: difícil digestão, enjôos, náuseas, cólicas intestinais e vômitos, ao revigorar o sistema digestivo. Graças a ação refrescante do hálito, combate o mau hálito e também ajuda a diminuir o apetite. No aparelho respiratório é usado para vários problemas, tosse seca, congestão nasal, asma, bronquite, resfriados e sinusite. Além de proporcionar frescor às vias respiratórias, a ação bactericida e antiviral do óleo ajudar a prevenir as doenças que atingem esse sistema. Por possuir ação analgésica, o óleo essencial de hortelã pode ser usado para massagear hematomas, lesões, locais doloridos do corpo; ajuda a aliviar dores reumáticas, de tendinite, nevralgia, artrite e dores musculares. Sua ação estética abrange mais cuidados capilares, realizando controle de oleosidade e estímulo do crescimento dos fios. Contudo, por aumentar a rigidez do local em que é aplicado e a circulação sanguínea é indicado para varizes e prevenção de celulites. Usado na pele, atua como amaciante, ajuda a remover cravos e diminui algumas irritações cutâneas (dermatites, sarna e pruridos). Contraindicações: evitar durante a gravidez e amamentação. Sempre usá-lo diluído. Não utilizar em crianças menores de 2 anos.",
3, null, null, null, 200, 1, "Óleo de Hortelã", 70.50);


