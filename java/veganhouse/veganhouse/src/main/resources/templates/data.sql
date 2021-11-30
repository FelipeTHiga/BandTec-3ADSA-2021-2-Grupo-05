insert into user values
(null, 0, "11122233345", "dino@hotmail.com", 0, "Dino", "sonho", "Sauro", null),
(null, 0, "10978253419", "flavia@hotmail.com", 0, "Flávia", "compaixao", "Silva", null),
(null, 0, "30046512368", "kel@hotmail.com", 0, "Kel", "proposito", "Kenan", null);

update user set is_seller = 1 where id in(1, 2, 3);

insert into seller values
(null, 82627153753643, "kerai_dino@gmail.com", "Kerai",  "kerai_sustentavel", 1, "@kerai_sustentavel", "(11) 94913-1006"),
(null, 76234158891300, "vegSeed@gmail.com", "VegSeed",  "vegSeed", 2, "@vegSeed", "(83) 95886-7231"),
(null, 80002536749211, "larVegan@gmail.com", "Lar Vegan",  "larVegan", 3, "@larVegan", "(16) 96623-2008");

insert into certification values
(null, "Selo Escolha sem Crueldade", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-1.png"),
(null, "Selo da Sociedade Vegetariana Brasileira", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-2.png"),
(null, "Selo da Vegan Societ", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-3.png"),
(null, "Selo The Leaping Bunny", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-4.png"),
(null, "Certificado Vegano da Organização Veganismo Brasil", "https://veganhousestorageblobs.blob.core.windows.net/images/Selo-5.png");

insert into product values
(null, "Acessórios", "Mochila diferenciada, confeccionada com lona de caminhão reaproveitada, várias divisorias: 1 bolso externo lateral, 1 bolso externo frontal com ziper,2 bolsos internos,1 alça de mão de 9cm,2 alças regulaveis de ombro,largura 37 cm,altura 24 cm profundidade 15cm.",
 1, 100, "Mochila Escolar", 75.00, "Acessórios"),
(null, "Acessórios", "Uma linda e superprática bolsa feita com lona de caminhão reaproveitada, com 2 bolsos externos e 1 interno, 1 alça de ombro regulável com altura mínima de 42 cm e máxima de 72 cm. Altura: 28cm, largura: 31 cm, profundidade: 12 cm.",
1, 100, "Bolsa carteiro", 120.50, "Acessórios"),
(null, "Vestimenta", "Serie limitada com o passaro montro (Kakaia Kuma) estampado. é um simbolo de proteção. baseado em uma lenda indigena. Calçado confeccionado em lona de garrafa pet e algodão reciclado, com solado injetado tr. Os calçados Kerai são confeccionados por mão de obra capacitada e bem remunerados fazendo assim do conceito ecofriendly uma diretriz abrangente de ponta a ponta, matéria-prima reciclada e cooperados/prestadores de serviço felizes.",
 1, 500, "SlipOn", 229.00, "Vestimenta"),
(null, "Vestimenta", "Tenis Rapé confeccionado com tecido da ecosimple 30% garrafa pet e 70% algodão reciclado , solado.microexpandido dando leveza ao calçado, uso casual e temos clientes utilizando.para esportes.. ótimo desempenho. Palmilha 6 mm super confortável e de facil reyirada para higienização.",
 1, 200, "Tenis Rapé", 229.00, "Vestimenta"),
(null, "Vestimenta", "Rasteira com tiras em 'X' confeccionada em tecido de garrafa PET e algodão reciclado. Os produtos Kerai são confeccionados por mão de obra capacitada e bem remunerados fazendo assim do conceito ecofriendly uma diretriz abrangente de ponta a ponta, matéria-prima reciclada e cooperados/prestadores de serviço felizes.",
1, 10, "Rasteira", 99.00, "Vestimenta");
