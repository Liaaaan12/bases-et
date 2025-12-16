use('BDY1103_E3_G1');
db.dropDatabase();

db.createCollection('equipos', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nombre', 'region', 'fecha_fundacion', 'activo', 'presupuesto'],
      properties: {
        nombre: { bsonType: 'string' },
        region: { enum: ['NA', 'EU', 'SA', 'ASIA'] },
        fecha_fundacion: { bsonType: 'date' },
        activo: { bsonType: 'bool' },
        presupuesto: { bsonType: 'int', minimum: 0 }
      }
    }
  }
});

db.createCollection('jugadores', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nickname', 'rol', 'equipo_id', 'edad', 'kda_promedio'],
      properties: {
        nickname: { bsonType: 'string' },
        rol: { enum: ['Entry', 'Support', 'IGL', 'AWP', 'Lurker'] },
        equipo_id: { bsonType: 'objectId' }, 
        edad: { bsonType: 'int', minimum: 16, maximum: 40 }, 
        kda_promedio: { bsonType: 'double' }
      }
    }
  }
});

db.createCollection('torneos', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nombre', 'premio_pool', 'finalizado', 'partidas'],
      properties: {
        nombre: { bsonType: 'string' },
        premio_pool: { bsonType: 'int' },
        finalizado: { bsonType: 'bool' },
        partidas: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['fase', 'mapa', 'resultado'],
            properties: {
              fase: { bsonType: 'string' },
              mapa: { bsonType: 'string' },
              resultado: { bsonType: 'string' }
            }
          }
        }
      }
    }
  }
});

db.equipos.insertMany([
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), nombre: "Leviatán", region: "SA", fecha_fundacion: new Date("2020-01-01"), activo: true, presupuesto: 150000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0002"), nombre: "KRÜ Esports", region: "SA", fecha_fundacion: new Date("2020-10-10"), activo: true, presupuesto: 120000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0003"), nombre: "Natus Vincere", region: "EU", fecha_fundacion: new Date("2009-12-17"), activo: true, presupuesto: 500000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0004"), nombre: "FaZe Clan", region: "EU", fecha_fundacion: new Date("2010-05-30"), activo: true, presupuesto: 450000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0005"), nombre: "G2 Esports", region: "EU", fecha_fundacion: new Date("2014-02-24"), activo: true, presupuesto: 480000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0006"), nombre: "Team Vitality", region: "EU", fecha_fundacion: new Date("2013-08-05"), activo: true, presupuesto: 420000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0007"), nombre: "Team Liquid", region: "NA", fecha_fundacion: new Date("2000-09-01"), activo: true, presupuesto: 600000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0008"), nombre: "Sentinels", region: "NA", fecha_fundacion: new Date("2016-05-01"), activo: true, presupuesto: 300000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0009"), nombre: "Paper Rex", region: "ASIA", fecha_fundacion: new Date("2020-01-01"), activo: true, presupuesto: 180000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0010"), nombre: "DRX", region: "ASIA", fecha_fundacion: new Date("2012-01-01"), activo: true, presupuesto: 200000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0011"), nombre: "Fnatic", region: "EU", fecha_fundacion: new Date("2004-07-23"), activo: true, presupuesto: 400000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0012"), nombre: "Cloud9", region: "NA", fecha_fundacion: new Date("2013-01-01"), activo: true, presupuesto: 350000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0013"), nombre: "FURIA", region: "SA", fecha_fundacion: new Date("2017-08-01"), activo: true, presupuesto: 160000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0014"), nombre: "MOUZ", region: "EU", fecha_fundacion: new Date("2002-01-01"), activo: true, presupuesto: 250000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0015"), nombre: "Astralis", region: "EU", fecha_fundacion: new Date("2016-01-18"), activo: true, presupuesto: 280000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0016"), nombre: "9z Team", region: "SA", fecha_fundacion: new Date("2018-08-01"), activo: true, presupuesto: 90000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0017"), nombre: "Imperial", region: "SA", fecha_fundacion: new Date("2018-03-01"), activo: true, presupuesto: 110000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0018"), nombre: "Heroic", region: "EU", fecha_fundacion: new Date("2016-08-26"), activo: true, presupuesto: 220000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0019"), nombre: "100 Thieves", region: "NA", fecha_fundacion: new Date("2017-11-20"), activo: false, presupuesto: 320000 },
  { _id: ObjectId("656a1b1b1b1b1b1b1b1b0020"), nombre: "EDward Gaming", region: "ASIA", fecha_fundacion: new Date("2013-09-13"), activo: true, presupuesto: 190000 },
  { nombre: "Team Genérico", region: "NA", fecha_fundacion: new Date("2023-01-01"), activo: false, presupuesto: 1000 }
]);

db.jugadores.insertMany([
  { nickname: "aspas", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), edad: 21, kda_promedio: 1.45 },
  { nickname: "kiNgg", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), edad: 22, kda_promedio: 1.15 },
  { nickname: "Mazino", rol: "Support", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), edad: 23, kda_promedio: 1.05 },
  { nickname: "tex", rol: "Lurker", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), edad: 24, kda_promedio: 1.10 },
  { nickname: "C0M", rol: "Support", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"), edad: 23, kda_promedio: 1.02 },
  { nickname: "keznit", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0002"), edad: 22, kda_promedio: 1.35 },
  { nickname: "Melser", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0002"), edad: 23, kda_promedio: 0.98 },
  { nickname: "s1mple", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0003"), edad: 26, kda_promedio: 1.32 },
  { nickname: "b1t", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0003"), edad: 21, kda_promedio: 1.12 },
  { nickname: "Aleksib", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0003"), edad: 27, kda_promedio: 0.95 },
  { nickname: "karrigan", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0004"), edad: 33, kda_promedio: 0.92 },
  { nickname: "ropz", rol: "Lurker", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0004"), edad: 24, kda_promedio: 1.18 },
  { nickname: "broky", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0004"), edad: 23, kda_promedio: 1.16 },
  { nickname: "m0NESY", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0005"), edad: 19, kda_promedio: 1.28 },
  { nickname: "NiKo", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0005"), edad: 27, kda_promedio: 1.22 },
  { nickname: "ZywOo", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0006"), edad: 23, kda_promedio: 1.38 },
  { nickname: "TenZ", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0008"), edad: 22, kda_promedio: 1.25 },
  { nickname: "Zekken", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0008"), edad: 19, kda_promedio: 1.30 },
  { nickname: "f0rsakeN", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0009"), edad: 20, kda_promedio: 1.20 },
  { nickname: "Jinggg", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0009"), edad: 21, kda_promedio: 1.25 },
  { nickname: "Fallen", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0013"), edad: 32, kda_promedio: 1.05 },
  { nickname: "KSCERATO", rol: "Lurker", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0013"), edad: 24, kda_promedio: 1.18 },
  { nickname: "max", rol: "IGL", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0016"), edad: 24, kda_promedio: 1.08 },
  { nickname: "dgt", rol: "Entry", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0016"), edad: 25, kda_promedio: 1.12 },
  { nickname: "device", rol: "AWP", equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0015"), edad: 28, kda_promedio: 1.15 }
]);

db.torneos.insertMany([
  { nombre: "PGL Major Copenhagen", premio_pool: 1250000, finalizado: true, partidas: [ { fase: "Final", mapa: "Ancient", resultado: "13-9" }, { fase: "Final", mapa: "Inferno", resultado: "13-3" } ] },
  { nombre: "Valorant Champions 2024", premio_pool: 2250000, finalizado: true, partidas: [ { fase: "Grupos", mapa: "Sunset", resultado: "13-11" }, { fase: "Playoffs", mapa: "Lotus", resultado: "13-10" } ] },
  { nombre: "IEM Cologne 2024", premio_pool: 1000000, finalizado: true, partidas: [ { fase: "Semifinal", mapa: "Nuke", resultado: "16-14" } ] },
  { nombre: "IEM Katowice 2024", premio_pool: 1000000, finalizado: true, partidas: [ { fase: "Cuartos", mapa: "Mirage", resultado: "13-5" } ] },
  { nombre: "VCT Masters Madrid", premio_pool: 500000, finalizado: true, partidas: [ { fase: "Final", mapa: "Split", resultado: "13-8" }, { fase: "Final", mapa: "Icebox", resultado: "14-12" } ] },
  { nombre: "VCT Masters Shanghai", premio_pool: 500000, finalizado: true, partidas: [ { fase: "Grupos", mapa: "Breeze", resultado: "13-6" } ] },
  { nombre: "BLAST Premier World Final", premio_pool: 1000000, finalizado: false, partidas: [] },
  { nombre: "ESL Pro League S19", premio_pool: 750000, finalizado: true, partidas: [ { fase: "Grupos", mapa: "Vertigo", resultado: "13-11" } ] },
  { nombre: "ESL Pro League S20", premio_pool: 750000, finalizado: false, partidas: [] },
  { nombre: "Perfect World Shanghai Major", premio_pool: 1250000, finalizado: false, partidas: [] },
  { nombre: "VCT Americas Stage 1", premio_pool: 250000, finalizado: true, partidas: [ { fase: "Regular", mapa: "Ascent", resultado: "13-4" } ] },
  { nombre: "VCT Americas Stage 2", premio_pool: 250000, finalizado: true, partidas: [ { fase: "Playoffs", mapa: "Haven", resultado: "13-9" } ] },
  { nombre: "VCT Pacific Stage 1", premio_pool: 250000, finalizado: true, partidas: [ { fase: "Regular", mapa: "Bind", resultado: "13-10" } ] },
  { nombre: "VCT EMEA Stage 1", premio_pool: 250000, finalizado: true, partidas: [ { fase: "Regular", mapa: "Split", resultado: "13-7" } ] },
  { nombre: "BetBoom Dacha", premio_pool: 300000, finalizado: true, partidas: [ { fase: "Final", mapa: "Anubis", resultado: "13-11" } ] },
  { nombre: "Thunderpick World Championship", premio_pool: 500000, finalizado: false, partidas: [] },
  { nombre: "FiReLEAGUE Global Finals", premio_pool: 150000, finalizado: true, partidas: [ { fase: "Final", mapa: "Dust2", resultado: "13-10" } ] },
  { nombre: "CCT Global Finals", premio_pool: 500000, finalizado: true, partidas: [ { fase: "Semis", mapa: "Inferno", resultado: "13-1" } ] },
  { nombre: "EWC 2024 (Esports World Cup)", premio_pool: 1000000, finalizado: true, partidas: [ { fase: "Final", mapa: "Ancient", resultado: "16-14" } ] },
  { nombre: "Red Bull Home Ground", premio_pool: 100000, finalizado: false, partidas: [] },
  { nombre: "Intel Extreme Masters Dallas", premio_pool: 250000, finalizado: true, partidas: [ { fase: "Final", mapa: "Nuke", resultado: "13-10" } ] }
]);

print("CONSULTAS FIND");

const q1 = db.jugadores.find({ edad: { $gte: 20, $lt: 25 } });
q1.forEach(printjson);

const q2 = db.equipos.find({
  $or: [ { region: 'SA' }, { presupuesto: { $gt: 450000 } } ]
});
q2.forEach(printjson);

const q3 = db.torneos.find({
  nombre: { $regex: /major/i }
});
q3.forEach(printjson);

print("AGGREGATE");

const agg = db.equipos.aggregate([
  { $group: { _id: "$region", promedioPresupuesto: { $avg: "$presupuesto" } } },
  { $sort: { promedioPresupuesto: -1 } }
]);
agg.forEach(printjson);

print("UPDATES");

print(db.jugadores.findOne({ nickname: 's1mple' }).edad);
db.jugadores.updateOne(
  { nickname: 's1mple' },
  { $inc: { edad: 1 } }
);
print(db.jugadores.findOne({ nickname: 's1mple' }).edad);

print(db.torneos.findOne({ nombre: 'Red Bull Home Ground' }).partidas.length);
db.torneos.updateOne(
  { nombre: 'Red Bull Home Ground' },
  { $push: { partidas: { fase: 'Grupos', mapa: 'Pearl', resultado: '13-5' } } }
);
print(db.torneos.findOne({ nombre: 'Red Bull Home Ground' }).partidas.length);

print(db.torneos.findOne({ nombre: 'PGL Major Copenhagen' }).partidas.length);
db.torneos.updateOne(
  { nombre: 'PGL Major Copenhagen' },
  { $pop: { partidas: 1 } }
);
print(db.torneos.findOne({ nombre: 'PGL Major Copenhagen' }).partidas.length);

print("ELIMINACIONES");

print(db.equipos.findOne({ nombre: 'Leviatán' }).activo);
db.equipos.updateOne(
  { nombre: 'Leviatán' },
  { $set: { activo: false } }
);
print(db.equipos.findOne({ nombre: 'Leviatán' }).activo);

print(db.equipos.findOne({ nombre: 'Team Genérico' }));
db.equipos.deleteOne({ nombre: 'Team Genérico' });
print(db.equipos.findOne({ nombre: 'Team Genérico' }));

print("VALIDACIONES");

try {
  db.jugadores.insertOne({
    nickname: "Hacker",
    rol: "Entry",
    equipo_id: ObjectId("656a1b1b1b1b1b1b1b1b0001"),
    edad: 100,
    kda_promedio: 5.0
  });
} catch (e) {
  print(e.message);
}

try {
  db.equipos.insertOne({
    region: "NA",
    fecha_fundacion: new Date(),
    activo: true,
    presupuesto: 1000
  });
} catch (e) {
  print(e.message);
}