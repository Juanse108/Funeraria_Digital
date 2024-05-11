package com.ucaldas.mssecurity.Notifications;

import com.azure.communication.email.*;
import com.azure.communication.email.models.*;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class NotificationEmail {

    private static final String ENV_FILE_PATH = "/home/davidrt/Documents/Proyect-Prog_3/Funeraria_Digital/ms-security/.env"; // recordar_cambio_ruta_cada_vez_que_se_haga_pull

    private static Map<String, String> getEnvVariables() {
        Map<String, String> envVars = new HashMap<>();
        try (BufferedReader br = new BufferedReader(new FileReader(ENV_FILE_PATH))) {
            String line;
            while ((line = br.readLine()) != null) {
                int equalsIndex = line.indexOf('=');
                if (equalsIndex != -1) {
                    String key = line.substring(0, equalsIndex).trim();
                    String value = line.substring(equalsIndex + 1).trim();
                    if (value.startsWith("\"") && value.endsWith("\"")) {
                        value = value.substring(1, value.length() - 1);
                    }
                    envVars.put(key, value);
                }
            }
        } catch (IOException e) {
            System.err.println("Error al leer el archivo .env: " + e.getMessage());
            System.exit(1);
        }

        if (!envVars.containsKey("CONNECTION_STRING") || !envVars.containsKey("SENDER_ADDRESS")) {
            System.err.println("Las variables de entorno CONNECTION_STRING y SENDER_ADDRESS son necesarias.");
            System.exit(1);
        }

        return envVars;
    }

    public static void sendEmail(String email, String random) {
        Map<String, String> envVars = getEnvVariables();
        String connectionString = envVars.get("CONNECTION_STRING");
        String senderAddress = envVars.get("SENDER_ADDRESS");

        EmailClient emailClient = new EmailClientBuilder().connectionString(connectionString).buildClient();
        EmailAddress toAddress = new EmailAddress(email);

        EmailMessage emailMessage = new EmailMessage()
                .setSenderAddress(senderAddress)
                .setToRecipients(toAddress)
                .setSubject("Clave de autenticacion")
                .setBodyPlainText(
                        "Su clave de autenticacion es: " + random + "\n Por favor no comparta esta clave con nadie.");

        System.out.println("Enviando correo electrónico...");

        SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(emailMessage, null);
        PollResponse<EmailSendResult> result = poller.waitForCompletion();
    }

    public static String generateRandomWord() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            char letter = (char) (random.nextInt(26) + 'A');
            sb.append(letter);
        }

        for (int i = 0; i < 3; i++) {
            char digit = (char) (random.nextInt(10) + '0');
            sb.append(digit);
        }

        return sb.toString();
    }

}